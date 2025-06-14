
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useBackendData } from '@/hooks/useBackendData';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Plus, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FederationForm from './federations/FederationForm';
import FederationsTable from './federations/FederationsTable';

const FederationsManagement = () => {
  const { federations, federationsLoading, operations } = useBackendData();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFederation, setEditingFederation] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    acronym: '',
    address: '',
    contact_email: '',
    contact_phone: '',
    website: '',
    logo_url: '',
    foundation_date: ''
  });

  // Log para debug
  useEffect(() => {
    console.log('Federations data:', federations);
    console.log('Federations loading:', federationsLoading);
    console.log('Total federations:', federations?.length || 0);
  }, [federations, federationsLoading]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({
        title: "Erro",
        description: "Por favor, preencha o nome da federação.",
        variant: "destructive"
      });
      return;
    }

    try {
      if (editingFederation) {
        await operations.federations.update.mutateAsync({ 
          id: editingFederation.id, 
          data: formData 
        });
        toast({
          title: "Sucesso",
          description: "Federação atualizada com sucesso!"
        });
      } else {
        await operations.federations.create.mutateAsync(formData);
        toast({
          title: "Sucesso", 
          description: "Federação criada com sucesso!"
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      console.error('Error saving federation:', error);
      toast({
        title: "Erro",
        description: `Erro ao salvar federação: ${error.message || 'Erro desconhecido'}`,
        variant: "destructive"
      });
    }
  };

  const handleEdit = (federation: any) => {
    setEditingFederation(federation);
    setFormData({
      name: federation.name || '',
      acronym: federation.acronym || '',
      address: federation.address || '',
      contact_email: federation.contact_email || '',
      contact_phone: federation.contact_phone || '',
      website: federation.website || '',
      logo_url: federation.logo_url || '',
      foundation_date: federation.foundation_date || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (federationId: string) => {
    if (confirm('Tem certeza que deseja eliminar esta federação?')) {
      try {
        await operations.federations.delete.mutateAsync(federationId);
        toast({
          title: "Sucesso",
          description: "Federação eliminada com sucesso!"
        });
      } catch (error: any) {
        console.error('Error deleting federation:', error);
        toast({
          title: "Erro",
          description: `Erro ao eliminar federação: ${error.message || 'Erro desconhecido'}`,
          variant: "destructive"
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      acronym: '',
      address: '',
      contact_email: '',
      contact_phone: '',
      website: '',
      logo_url: '',
      foundation_date: ''
    });
    setEditingFederation(null);
  };

  if (federationsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Carregando federações...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cv-blue flex items-center gap-2">
            <Building className="h-6 w-6" />
            Gestão de Federações
          </h2>
          <p className="text-gray-600">Gerir federações de basquetebol</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-cv-blue hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Nova Federação
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingFederation ? 'Editar Federação' : 'Nova Federação'}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações da federação
              </DialogDescription>
            </DialogHeader>
            <FederationForm
              formData={formData}
              isEditing={!!editingFederation}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Federações ({federations?.length || 0})</CardTitle>
          <CardDescription>
            Lista de federações de basquetebol
            {federations?.length === 0 && !federationsLoading && (
              <span className="text-yellow-600 block mt-1">
                Nenhuma federação encontrada. Verifique a conexão com a base de dados.
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {federations?.length > 0 ? (
            <FederationsTable
              federations={federations}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <div className="text-center py-8">
              <Building className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Nenhuma federação encontrada
              </h3>
              <p className="text-gray-500 mb-4">
                Comece criando a primeira federação
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeira Federação
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FederationsManagement;
