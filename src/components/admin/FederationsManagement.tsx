
import React, { useState } from 'react';
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
          <CardTitle>Federações ({federations.length})</CardTitle>
          <CardDescription>
            Lista de federações de basquetebol
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FederationsTable
            federations={federations}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default FederationsManagement;
