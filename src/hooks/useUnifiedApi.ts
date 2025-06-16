
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useCallback, useMemo } from 'react';
import type { Database } from '@/integrations/supabase/types';

type TableName = keyof Database['public']['Tables'];

interface QueryOptions {
  enabled?: boolean;
  staleTime?: number;
  select?: string;
  filters?: Record<string, any>;
  orderBy?: { column: string; ascending: boolean };
  limit?: number;
}

export const useUnifiedApi = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Função otimizada para fetch com cache inteligente
  const fetchData = useCallback(async <T extends TableName>(
    table: T, 
    options: QueryOptions = {}
  ) => {
    const { select = '*', filters, orderBy, limit } = options;
    
    let query = supabase.from(table).select(select);
    
    // Aplicar filtros
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }
    
    // Aplicar ordenação
    if (orderBy) {
      query = query.order(orderBy.column, { ascending: orderBy.ascending });
    }
    
    // Aplicar limite
    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) {
      console.error(`Error fetching ${table}:`, error);
      throw error;
    }
    
    return data;
  }, []);

  // Hook otimizado para queries
  const useOptimizedFetch = <T extends TableName>(
    table: T, 
    options: QueryOptions = {}
  ) => {
    const { enabled = true, staleTime = 5 * 60 * 1000 } = options;
    
    const queryKey = useMemo(() => [table, options], [table, options]);
    
    return useQuery({
      queryKey,
      queryFn: () => fetchData(table, options),
      enabled,
      staleTime,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1
    });
  };

  // CRUD operations otimizadas
  const useOptimizedCreate = <T extends TableName>(table: T) => {
    return useMutation({
      mutationFn: async (data: Database['public']['Tables'][T]['Insert']) => {
        const { data: result, error } = await supabase
          .from(table)
          .insert(data)
          .select()
          .single();
        
        if (error) throw error;
        return result;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [table] });
        toast({
          title: "Sucesso",
          description: "Item criado com sucesso.",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Erro",
          description: `Erro ao criar: ${error.message}`,
          variant: "destructive",
        });
      },
    });
  };

  const useOptimizedUpdate = <T extends TableName>(table: T) => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: string; data: Database['public']['Tables'][T]['Update'] }) => {
        const { data: result, error } = await supabase
          .from(table)
          .update(data)
          .eq('id', id)
          .select()
          .single();
        
        if (error) throw error;
        return result;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [table] });
        toast({
          title: "Sucesso",
          description: "Item atualizado com sucesso.",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Erro",
          description: `Erro ao atualizar: ${error.message}`,
          variant: "destructive",
        });
      },
    });
  };

  const useOptimizedDelete = <T extends TableName>(table: T) => {
    return useMutation({
      mutationFn: async (id: string) => {
        const { error } = await supabase
          .from(table)
          .delete()
          .eq('id', id);
        
        if (error) throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [table] });
        toast({
          title: "Sucesso",
          description: "Item eliminado com sucesso.",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Erro",
          description: `Erro ao eliminar: ${error.message}`,
          variant: "destructive",
        });
      },
    });
  };

  return {
    useOptimizedFetch,
    useOptimizedCreate,
    useOptimizedUpdate,
    useOptimizedDelete,
    fetchData
  };
};
