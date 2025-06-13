
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useBackendData } from '@/hooks/useBackendData';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ClubsManagement = () => {
  const { teams, isLoading, operations } = useBackendData();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClub, setEditingClub] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    abbreviation: '',
    city: '',
    island: '',
    founded_year: '',
    website: '',
    email: '',
    phone: '',
    address: '',
    president_name: '',
    coach_name: '',
    home_venue: '',
    status: 'ativo'
  });

  const islands = ['Santiago', 'São Vicente', 'Santo Antão', 'Fogo', 'Maio', 'Sal', 'Boa Vista', 'Brava', 'São Nicolau'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const clubData = {
        ...formData,
        founded_year: formData.founded_year ? parseInt(formData.founded_year) : null
      };

      if (editingClub) {
        await operations.teams.update.mutateAsync({ 
          id: editingClub.id, 
          data: clubData 
        });
        toast({
          title: "Sucesso",
          description: "Clube atualizado com sucesso!"
        });
      } else {
        await operations.teams.create.mutateAsync(clubData);
        toast({
          title: "Sucesso", 
          description: "Clube criado com sucesso!"
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar clube",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (club: any) => {
    setEditingClub(club);
    setFormData({
      name: club.name || '',
      abbreviation: club.abbreviation || '',
      city: club.city || '',
      island: club.island || '',
      founded_year: club.founded_year?.toString() || '',
      website: club.website || '',
      email: club.email || '',
      phone: club.phone || '',
      address: club.address || '',
      president_name: club.president_name || '',
      coach_name: club.coach_name || '',
      home_venue: club.home_venue || '',
      status: club.status || 'ativo'
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (clubId: string) => {
    if (confirm('Tem certeza que deseja eliminar este clube?')) {
      try {
        await operations.teams.delete.mutateAsync(clubId);
        toast({
          title: "Sucesso",
          description: "Clube eliminado com sucesso!"
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "Erro ao eliminar clube",
          variant: "destructive"
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      abbreviation: '',
      city: '',
      island: '',
      founded_year: '',
      website: '',
      email: '',
      phone: '',
      address: '',
      president_name: '',
      coach_name: '',
      home_venue: '',
      status: 'ativo'
    });
    setEditingClub(null);
  };

  if (isLoading) {
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
            <Users className="h-6 w-6" />
            Gestão de Clubes
          </h2>
          <p className="text-gray-600">Gerir clubes, equipas e informações administrativas</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Clube
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingClub ? 'Editar Clube' : 'Novo Clube'}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações do clube
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome do Clube *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="abbreviation">Abreviação</Label>
                  <Input
                    id="abbreviation"
                    value={formData.abbreviation}
                    onChange={(e) => handleInputChange('abbreviation', e.target.value)}
                    maxLength={10}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Cidade *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="island">Ilha *</Label>
                  <Select value={formData.island} onValueChange={(value) => handleInputChange('island', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar ilha" />
                    </SelectTrigger>
                    <SelectContent>
                      {islands.map((island) => (
                        <SelectItem key={island} value={island}>{island}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="founded_year">Ano de Fundação</Label>
                  <Input
                    id="founded_year"
                    type="number"
                    value={formData.founded_year}
                    onChange={(e) => handleInputChange('founded_year', e.target.value)}
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                      <SelectItem value="suspenso">Suspenso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="address">Morada</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="president_name">Presidente</Label>
                  <Input
                    id="president_name"
                    value={formData.president_name}
                    onChange={(e) => handleInputChange('president_name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="coach_name">Treinador Principal</Label>
                  <Input
                    id="coach_name"
                    value={formData.coach_name}
                    onChange={(e) => handleInputChange('coach_name', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="home_venue">Pavilhão Principal</Label>
                <Input
                  id="home_venue"
                  value={formData.home_venue}
                  onChange={(e) => handleInputChange('home_venue', e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingClub ? 'Atualizar' : 'Criar'} Clube
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
          <CardTitle>Clubes Registados ({teams.length})</CardTitle>
          <CardDescription>
            Lista completa de clubes no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Abreviação</TableHead>
                <TableHead>Cidade/Ilha</TableHead>
                <TableHead>Fundação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((club: any) => (
                <TableRow key={club.id}>
                  <TableCell className="font-medium">{club.name}</TableCell>
                  <TableCell>{club.abbreviation}</TableCell>
                  <TableCell>{club.city}, {club.island}</TableCell>
                  <TableCell>{club.founded_year}</TableCell>
                  <TableCell>
                    <Badge variant={club.status === 'ativo' ? 'default' : 'secondary'}>
                      {club.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(club)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(club.id)}
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

export default ClubsManagement;
