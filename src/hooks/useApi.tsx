
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Generic API hook for CRUD operations
export const useApi = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Generic fetch function
  const fetchData = async (table: string, filters?: Record<string, any>) => {
    let query = supabase.from(table).select('*');
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  };

  // Generic create function
  const createData = async (table: string, data: any) => {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  };

  // Generic update function
  const updateData = async (table: string, id: string, data: any) => {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  };

  // Generic delete function
  const deleteData = async (table: string, id: string) => {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  };

  // Hook for fetching data
  const useFetch = (table: string, filters?: Record<string, any>) => {
    return useQuery({
      queryKey: [table, filters],
      queryFn: () => fetchData(table, filters),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Hook for creating data
  const useCreate = (table: string) => {
    return useMutation({
      mutationFn: (data: any) => createData(table, data),
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
          description: `Erro ao criar item: ${error.message}`,
          variant: "destructive",
        });
      },
    });
  };

  // Hook for updating data
  const useUpdate = (table: string) => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: any }) => updateData(table, id, data),
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
          description: `Erro ao atualizar item: ${error.message}`,
          variant: "destructive",
        });
      },
    });
  };

  // Hook for deleting data
  const useDelete = (table: string) => {
    return useMutation({
      mutationFn: (id: string) => deleteData(table, id),
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
          description: `Erro ao eliminar item: ${error.message}`,
          variant: "destructive",
        });
      },
    });
  };

  return {
    useFetch,
    useCreate,
    useUpdate,
    useDelete,
    fetchData,
    createData,
    updateData,
    deleteData
  };
};
