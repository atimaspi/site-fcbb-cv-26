
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useBackendData } from '@/hooks/useBackendData';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Shield, CalendarIcon, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const RefereesManagement = () => {
  const { referees, isLoading, operations } = useBackendData();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReferee, setEditingReferee] = useState(null);
  const [birthDate, setBirthDate] = useState<Date>();
  const [licenseExpiry, setLicenseExpiry] = useState<Date>();
  const [formData, setFormData] = useState({
    name: '',
    license_number: '',
    level: '',
    email: '',
    phone: '',
    address: '',
    status: 'ativo'
  });

  const refereeLevels = [
    { value: 'Local', label: 'Local' },
    { value: 'Regional', label: 'Regional' },
    { value: 'Nacional', label: 'Nacional' },
    { value: 'Internacional', label: 'Internacional' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const refereeData = {
        ...formData,
        birth_date: birthDate?.toISOString().split('T')[0] || null,
        license_expiry: licenseExpiry?.toISOString().split('T')[0] || null
      };

      if (editingReferee) {
        await operations.referees.update.mutateAsync({ 
          id: editingReferee.id, 
          data: refereeData 
        });
        toast({
          title: "Sucesso",
          description: "Árbitro atualizado com sucesso!"
        });
      } else {
        await operations.referees.create.mutateAsync(refereeData);
        toast({
          title: "Sucesso", 
          description: "Árbitro criado com sucesso!"
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar árbitro",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (referee: any) => {
    setEditingReferee(referee);
    setFormData({
      name: referee.name || '',
      license_number: referee.license_number || '',
      level: referee.level || '',
      email: referee.email || '',
      phone: referee.phone || '',
      address: referee.address || '',
      status: referee.status || 'ativo'
    });
    if (referee.birth_date) {
      setBirthDate(new Date(referee.birth_date));
    }
    if (referee.license_expiry) {
      setLicenseExpiry(new Date(referee.license_expiry));
    }
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
      } catch (error) {
        toast({
          title: "Erro",
          description: "Erro ao eliminar árbitro",
          variant: "destructive"
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      license_number: '',
      level: '',
      email: '',
      phone: '',
      address: '',
      status: 'ativo'
    });
    setBirthDate(undefined);
    setLicenseExpiry(undefined);
    setEditingReferee(null);
  };

  const isLicenseExpiring = (expiryDate: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const now = new Date();
    const monthsUntilExpiry = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30);
    return monthsUntilExpiry <= 3;
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
            <Shield className="h-6 w-6" />
            Gestão de Arbitragem
          </h2>
          <p className="text-gray-600">Gerir árbitros e licenças</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Árbitro
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="license_number">Número da Licença *</Label>
                  <Input
                    id="license_number"
                    value={formData.license_number}
                    onChange={(e) => handleInputChange('license_number', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="level">Nível *</Label>
                  <Select value={formData.level} onValueChange={(value) => handleInputChange('level', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar nível" />
                    </SelectTrigger>
                    <SelectContent>
                      {refereeLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                      ))}
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
                <Label htmlFor="address">Morada</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Data de Nascimento</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !birthDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {birthDate ? format(birthDate, "dd/MM/yyyy") : <span>Selecionar data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={birthDate}
                        onSelect={setBirthDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Validade da Licença</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !licenseExpiry && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {licenseExpiry ? format(licenseExpiry, "dd/MM/yyyy") : <span>Selecionar data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={licenseExpiry}
                        onSelect={setLicenseExpiry}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
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

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
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

      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Árbitros Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">
              {referees.filter((r: any) => r.status === 'ativo').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Nível Nacional</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {referees.filter((r: any) => r.level === 'Nacional').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Nível Internacional</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {referees.filter((r: any) => r.level === 'Internacional').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Licenças a Expirar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {referees.filter((r: any) => isLicenseExpiring(r.license_expiry)).length}
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
                <TableHead>Nível</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Validade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referees.map((referee: any) => (
                <TableRow key={referee.id}>
                  <TableCell className="font-medium">{referee.name}</TableCell>
                  <TableCell>{referee.license_number}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{referee.level}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {referee.email && <div>{referee.email}</div>}
                      {referee.phone && <div>{referee.phone}</div>}
                    </div>
                  </TableCell>
                  <TableCell>
                    {referee.license_expiry ? (
                      <div className={isLicenseExpiring(referee.license_expiry) ? 'text-red-600 font-medium' : ''}>
                        {format(new Date(referee.license_expiry), 'dd/MM/yyyy')}
                      </div>
                    ) : (
                      'Não definido'
                    )}
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
