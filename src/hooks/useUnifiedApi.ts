
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useCallback, useMemo } from 'react';

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

  const fetchData = useCallback(async (
    table: string, 
    options: QueryOptions = {}
  ) => {
    try {
      const { select = '*', filters, orderBy, limit } = options;
      
      let query = (supabase as any).from(table).select(select);
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }
      
      if (orderBy) {
        query = query.order(orderBy.column, { ascending: orderBy.ascending });
      }
      
      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error(`Error fetching ${table}:`, error);
        throw new Error(`Erro ao carregar ${table}: ${error.message}`);
      }
      
      return data || [];
    } catch (error: any) {
      console.error(`Fetch error for ${table}:`, error);
      throw error;
    }
  }, []);

  const useOptimizedFetch = (
    table: string, 
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
      retry: (failureCount, error: any) => {
        if (error?.message?.includes('infinite recursion') || 
            error?.message?.includes('policy') ||
            error?.code === '42P17') {
          return false;
        }
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
    });
  };

  const useOptimizedCreate = (table: string) => {
    return useMutation({
      mutationFn: async (data: any) => {
        try {
          const { data: result, error } = await (supabase as any)
            .from(table)
            .insert(data)
            .select()
            .single();
          
          if (error) {
            console.error(`Create error for ${table}:`, error);
            throw new Error(`Erro ao criar item: ${error.message}`);
          }
          
          return result;
        } catch (error: any) {
          console.error(`Create mutation error for ${table}:`, error);
          throw error;
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [table] });
        toast({
          title: "Sucesso",
          description: "Item criado com sucesso.",
        });
      },
      onError: (error: any) => {
        console.error(`Create error:`, error);
        toast({
          title: "Erro",
          description: error.message || "Erro ao criar item",
          variant: "destructive",
        });
      },
    });
  };

  const useOptimizedUpdate = (table: string) => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: string; data: any }) => {
        try {
          const { data: result, error } = await (supabase as any)
            .from(table)
            .update(data)
            .eq('id', id)
            .select()
            .single();
          
          if (error) {
            console.error(`Update error for ${table}:`, error);
            throw new Error(`Erro ao atualizar item: ${error.message}`);
          }
          
          return result;
        } catch (error: any) {
          console.error(`Update mutation error for ${table}:`, error);
          throw error;
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [table] });
        toast({
          title: "Sucesso",
          description: "Item atualizado com sucesso.",
        });
      },
      onError: (error: any) => {
        console.error(`Update error:`, error);
        toast({
          title: "Erro",
          description: error.message || "Erro ao atualizar item",
          variant: "destructive",
        });
      },
    });
  };

  const useOptimizedDelete = (table: string) => {
    return useMutation({
      mutationFn: async (id: string) => {
        try {
          const { error } = await (supabase as any)
            .from(table)
            .delete()
            .eq('id', id);
          
          if (error) {
            console.error(`Delete error for ${table}:`, error);
            throw new Error(`Erro ao eliminar item: ${error.message}`);
          }
        } catch (error: any) {
          console.error(`Delete mutation error for ${table}:`, error);
          throw error;
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [table] });
        toast({
          title: "Sucesso",
          description: "Item eliminado com sucesso.",
        });
      },
      onError: (error: any) => {
        console.error(`Delete error:`, error);
        toast({
          title: "Erro",
          description: error.message || "Erro ao eliminar item",
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
