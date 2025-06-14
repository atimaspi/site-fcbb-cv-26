
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
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PlayersManagementAdvanced = () => {
  const { players, teams, playersLoading, operations } = useBackendData();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<any>(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    team_id: '',
    jersey_number: '',
    position: '',
    height_cm: '',
    weight_kg: '',
    birth_date: '',
    nationality: 'Cabo Verde',
    status: 'ativo'
  });

  const positions = ['Base', 'Escolta', 'Extremo', 'Ala', 'Poste'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.first_name || !formData.last_name) {
      toast({
        title: "Erro",
        description: "Por favor, preencha pelo menos o nome e apelido.",
        variant: "destructive"
      });
      return;
    }

    try {
      const playerData = {
        ...formData,
        jersey_number: formData.jersey_number ? parseInt(formData.jersey_number) : null,
        height_cm: formData.height_cm ? parseInt(formData.height_cm) : null,
        weight_kg: formData.weight_kg ? parseInt(formData.weight_kg) : null,
        birth_date: formData.birth_date || null
      };

      if (editingPlayer) {
        await operations.players.update.mutateAsync({ 
          id: editingPlayer.id, 
          data: playerData 
        });
        toast({
          title: "Sucesso",
          description: "Jogador atualizado com sucesso!"
        });
      } else {
        await operations.players.create.mutateAsync(playerData);
        toast({
          title: "Sucesso", 
          description: "Jogador criado com sucesso!"
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao salvar jogador: ${error.message || 'Erro desconhecido'}`,
        variant: "destructive"
      });
    }
  };

  const handleEdit = (player: any) => {
    setEditingPlayer(player);
    setFormData({
      first_name: player.first_name || '',
      last_name: player.last_name || '',
      team_id: player.team_id || '',
      jersey_number: player.jersey_number?.toString() || '',
      position: player.position || '',
      height_cm: player.height_cm?.toString() || '',
      weight_kg: player.weight_kg?.toString() || '',
      birth_date: player.birth_date || '',
      nationality: player.nationality || 'Cabo Verde',
      status: player.status || 'ativo'
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (playerId: string) => {
    if (confirm('Tem certeza que deseja eliminar este jogador?')) {
      try {
        await operations.players.delete.mutateAsync(playerId);
        toast({
          title: "Sucesso",
          description: "Jogador eliminado com sucesso!"
        });
      } catch (error: any) {
        toast({
          title: "Erro",
          description: `Erro ao eliminar jogador: ${error.message || 'Erro desconhecido'}`,
          variant: "destructive"
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      team_id: '',
      jersey_number: '',
      position: '',
      height_cm: '',
      weight_kg: '',
      birth_date: '',
      nationality: 'Cabo Verde',
      status: 'ativo'
    });
    setEditingPlayer(null);
  };

  if (playersLoading) {
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
            Gestão de Jogadores
          </h2>
          <p className="text-gray-600">Gerir jogadores registados no sistema</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-cv-blue hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Jogador
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingPlayer ? 'Editar Jogador' : 'Novo Jogador'}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações do jogador
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">Nome *</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Apelido *</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="team_id">Equipa</Label>
                  <Select value={formData.team_id} onValueChange={(value) => handleInputChange('team_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar equipa" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="jersey_number">Número da Camisola</Label>
                  <Input
                    id="jersey_number"
                    type="number"
                    min="0"
                    max="99"
                    value={formData.jersey_number}
                    onChange={(e) => handleInputChange('jersey_number', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="position">Posição</Label>
                  <Select value={formData.position} onValueChange={(value) => handleInputChange('position', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar posição" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((position) => (
                        <SelectItem key={position} value={position}>{position}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="nationality">Nacionalidade</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="height_cm">Altura (cm)</Label>
                  <Input
                    id="height_cm"
                    type="number"
                    min="150"
                    max="250"
                    value={formData.height_cm}
                    onChange={(e) => handleInputChange('height_cm', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="weight_kg">Peso (kg)</Label>
                  <Input
                    id="weight_kg"
                    type="number"
                    min="50"
                    max="200"
                    value={formData.weight_kg}
                    onChange={(e) => handleInputChange('weight_kg', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="birth_date">Data de Nascimento</Label>
                  <Input
                    id="birth_date"
                    type="date"
                    value={formData.birth_date}
                    onChange={(e) => handleInputChange('birth_date', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-cv-blue hover:bg-blue-700">
                  {editingPlayer ? 'Atualizar' : 'Criar'} Jogador
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
          <CardTitle>Jogadores Registados ({players.length})</CardTitle>
          <CardDescription>
            Lista completa de jogadores no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Equipa</TableHead>
                <TableHead>Posição</TableHead>
                <TableHead>Número</TableHead>
                <TableHead>Nacionalidade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player: any) => (
                <TableRow key={player.id}>
                  <TableCell className="font-medium">
                    {player.first_name} {player.last_name}
                  </TableCell>
                  <TableCell>
                    {teams.find(t => t.id === player.team_id)?.name || '—'}
                  </TableCell>
                  <TableCell>{player.position || '—'}</TableCell>
                  <TableCell>{player.jersey_number || '—'}</TableCell>
                  <TableCell>{player.nationality || '—'}</TableCell>
                  <TableCell>
                    <Badge variant={player.status === 'ativo' ? 'default' : 'secondary'}>
                      {player.status || 'ativo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(player)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(player.id)}
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

export default PlayersManagementAdvanced;
