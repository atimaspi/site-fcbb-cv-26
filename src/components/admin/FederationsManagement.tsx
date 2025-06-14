
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useBackendData } from '@/hooks/useBackendData';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Plus, Edit, Trash2, Building, Globe, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome da Federação *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    placeholder="Ex: Federação Caboverdiana de Basquetebol"
                  />
                </div>
                <div>
                  <Label htmlFor="acronym">Acrónimo</Label>
                  <Input
                    id="acronym"
                    value={formData.acronym}
                    onChange={(e) => handleInputChange('acronym', e.target.value)}
                    placeholder="Ex: FCBB"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_email">Email de Contacto</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => handleInputChange('contact_email', e.target.value)}
                    placeholder="federacao@exemplo.com"
                  />
                </div>
                <div>
                  <Label htmlFor="contact_phone">Telefone de Contacto</Label>
                  <Input
                    id="contact_phone"
                    value={formData.contact_phone}
                    onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                    placeholder="+238 123 456 789"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://federacao.exemplo.com"
                  />
                </div>
                <div>
                  <Label htmlFor="foundation_date">Data de Fundação</Label>
                  <Input
                    id="foundation_date"
                    type="date"
                    value={formData.foundation_date}
                    onChange={(e) => handleInputChange('foundation_date', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Endereço da sede"
                  />
                </div>
                <div>
                  <Label htmlFor="logo_url">URL do Logo</Label>
                  <Input
                    id="logo_url"
                    type="url"
                    value={formData.logo_url}
                    onChange={(e) => handleInputChange('logo_url', e.target.value)}
                    placeholder="https://exemplo.com/logo.png"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-cv-blue hover:bg-blue-700">
                  {editingFederation ? 'Atualizar' : 'Criar'} Federação
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Acrónimo</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Fundação</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {federations.map((federation: any) => (
                <TableRow key={federation.id}>
                  <TableCell className="font-medium">{federation.name}</TableCell>
                  <TableCell>{federation.acronym || '—'}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {federation.contact_email && <div>{federation.contact_email}</div>}
                      {federation.contact_phone && <div>{federation.contact_phone}</div>}
                      {!federation.contact_email && !federation.contact_phone && '—'}
                    </div>
                  </TableCell>
                  <TableCell>
                    {federation.website ? (
                      <a href={federation.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
                        <Globe className="h-3 w-3 mr-1" />
                        Website
                      </a>
                    ) : '—'}
                  </TableCell>
                  <TableCell>
                    {federation.foundation_date ? (
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                        {new Date(federation.foundation_date).toLocaleDateString('pt-PT')}
                      </div>
                    ) : '—'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(federation)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(federation.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FederationsManagement;
