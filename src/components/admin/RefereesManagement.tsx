
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBackendData } from '@/hooks/useBackendData';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Shield, Phone, Mail, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RefereesManagement = () => {
  const { referees, refereesLoading, operations } = useBackendData();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReferee, setEditingReferee] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    license_number: '',
    category: '',
    phone: '',
    email: '',
    island: '',
    status: 'ativo'
  });

  const islands = ['Santiago', 'São Vicente', 'Santo Antão', 'Fogo', 'Maio', 'Sal', 'Boa Vista', 'Brava', 'São Nicolau'];
  const categories = ['Nacional', 'Regional', 'Distrital', 'Juventude', 'Formação'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.island) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    try {
      if (editingReferee) {
        await operations.referees.update.mutateAsync({ 
          id: editingReferee.id, 
          data: formData 
        });
        toast({
          title: "Sucesso",
          description: "Árbitro atualizado com sucesso!"
        });
      } else {
        await operations.referees.create.mutateAsync(formData);
        toast({
          title: "Sucesso", 
          description: "Árbitro criado com sucesso!"
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao salvar árbitro: ${error.message || 'Erro desconhecido'}`,
        variant: "destructive"
      });
    }
  };

  const handleEdit = (referee: any) => {
    setEditingReferee(referee);
    setFormData({
      name: referee.name || '',
      license_number: referee.license_number || '',
      category: referee.category || '',
      phone: referee.phone || '',
      email: referee.email || '',
      island: referee.island || '',
      status: referee.status || 'ativo'
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (refereeId: string) => {
    if (confirm('Tem certeza que deseja eliminar este árbitro?')) {
      try {
        await operations.referees.delete.mutateAsync(refereeId);
        toast({
          title: "Sucesso",
          description: "Árbitro eliminado com sucesso!"
        });
      } catch (error: any) {
        toast({
          title: "Erro",
          description: `Erro ao eliminar árbitro: ${error.message || 'Erro desconhecido'}`,
          variant: "destructive"
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      license_number: '',
      category: '',
      phone: '',
      email: '',
      island: '',
      status: 'ativo'
    });
    setEditingReferee(null);
  };

  if (refereesLoading) {
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
            <Shield className="h-6 w-6" />
            Gestão de Arbitragem
          </h2>
          <p className="text-gray-600">Gerir árbitros e oficiais de mesa</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-cv-blue hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Árbitro
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingReferee ? 'Editar Árbitro' : 'Novo Árbitro'}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações do árbitro
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  placeholder="Ex: João Silva Santos"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="license_number">Número de Licença</Label>
                  <Input
                    id="license_number"
                    value={formData.license_number}
                    onChange={(e) => handleInputChange('license_number', e.target.value)}
                    placeholder="Ex: ARB2024001"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Categoria *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Ex: +238 123 45 67"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="arbitro@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-cv-blue hover:bg-blue-700">
                  {editingReferee ? 'Atualizar' : 'Criar'} Árbitro
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

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-cv-blue" />
              <div>
                <p className="text-sm font-medium">Total de Árbitros</p>
                <p className="text-2xl font-bold text-cv-blue">{referees.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Árbitros Ativos</p>
                <p className="text-2xl font-bold text-green-600">
                  {referees.filter(ref => ref.status === 'ativo').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Categoria Nacional</p>
                <p className="text-2xl font-bold text-orange-600">
                  {referees.filter(ref => ref.category === 'Nacional').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Ilhas Cobertas</p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(referees.map(ref => ref.island)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Árbitros Registados ({referees.length})</CardTitle>
          <CardDescription>
            Lista completa de árbitros no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Licença</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Ilha</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referees.map((referee: any) => (
                <TableRow key={referee.id}>
                  <TableCell className="font-medium">{referee.name}</TableCell>
                  <TableCell>{referee.license_number || '—'}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{referee.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {referee.phone && (
                        <div className="flex items-center space-x-1 text-sm">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span>{referee.phone}</span>
                        </div>
                      )}
                      {referee.email && (
                        <div className="flex items-center space-x-1 text-sm">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <span>{referee.email}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span>{referee.island}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={referee.status === 'ativo' ? 'default' : 'secondary'}>
                      {referee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(referee)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(referee.id)}
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

export default RefereesManagement;
