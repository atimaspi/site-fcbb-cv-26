
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, PenLine, Trash2, Plus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Player {
  id: string;
  first_name: string;
  last_name: string;
  club: string;
  position: string;
  jersey_number: number;
  age: number;
  nationality: string;
  status: string;
}

const PlayersManagement = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<Player | null>(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    club: '',
    position: 'Base',
    jersey_number: 0,
    age: 0,
    nationality: 'Cabo Verde',
    status: 'active'
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedPlayers = data.map(item => ({
        id: item.id,
        first_name: item.first_name,
        last_name: item.last_name,
        club: item.club || '',
        position: item.position || 'Base',
        jersey_number: item.jersey_number || 0,
        age: item.age || 0,
        nationality: item.nationality || 'Cabo Verde',
        status: item.status === 'active' ? 'Ativo' : item.status === 'injured' ? 'Lesionado' : 'Inativo'
      }));

      setPlayers(formattedPlayers);
    } catch (error) {
      console.error('Erro ao carregar jogadores:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar jogadores. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ first_name: '', last_name: '', club: '', position: 'Base', jersey_number: 0, age: 0, nationality: 'Cabo Verde', status: 'active' });
    setShowDialog(true);
  };

  const handleEdit = (item: Player) => {
    setEditingItem(item);
    setFormData({
      first_name: item.first_name,
      last_name: item.last_name,
      club: item.club,
      position: item.position,
      jersey_number: item.jersey_number,
      age: item.age,
      nationality: item.nationality,
      status: item.status === 'Ativo' ? 'active' : item.status === 'Lesionado' ? 'injured' : 'inactive'
    });
    setShowDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja eliminar este jogador?')) return;

    try {
      const { error } = await supabase
        .from('players')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Jogador eliminado com sucesso.",
      });

      fetchPlayers();
    } catch (error) {
      console.error('Erro ao eliminar jogador:', error);
      toast({
        title: "Erro",
        description: "Erro ao eliminar jogador. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingItem) {
        const { error } = await supabase
          .from('players')
          .update({
            first_name: formData.first_name,
            last_name: formData.last_name,
            club: formData.club,
            position: formData.position,
            jersey_number: formData.jersey_number,
            age: formData.age,
            nationality: formData.nationality,
            status: formData.status
          })
          .eq('id', editingItem.id);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Jogador atualizado com sucesso.",
        });
      } else {
        const { error } = await supabase
          .from('players')
          .insert({
            first_name: formData.first_name,
            last_name: formData.last_name,
            club: formData.club,
            position: formData.position,
            jersey_number: formData.jersey_number,
            age: formData.age,
            nationality: formData.nationality,
            status: formData.status
          });

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Jogador registado com sucesso.",
        });
      }

      setShowDialog(false);
      setFormData({ first_name: '', last_name: '', club: '', position: 'Base', jersey_number: 0, age: 0, nationality: 'Cabo Verde', status: 'active' });
      fetchPlayers();
    } catch (error) {
      console.error('Erro ao salvar jogador:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar jogador. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-cv-blue">Gestão de Jogadores</h3>
        <Button onClick={handleAdd} className="bg-cv-blue hover:bg-blue-700 flex items-center gap-2">
          <Plus size={18} />
          Adicionar Jogador
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Clube</TableHead>
              <TableHead>Posição</TableHead>
              <TableHead>Nº</TableHead>
              <TableHead>Idade</TableHead>
              <TableHead>Nacionalidade</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">Carregando...</TableCell>
              </TableRow>
            ) : players.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">Nenhum jogador encontrado</TableCell>
              </TableRow>
            ) : (
              players.map((player) => (
                <TableRow key={player.id}>
                  <TableCell className="font-medium">{`${player.first_name} ${player.last_name}`}</TableCell>
                  <TableCell>{player.club}</TableCell>
                  <TableCell>{player.position}</TableCell>
                  <TableCell>{player.jersey_number}</TableCell>
                  <TableCell>{player.age}</TableCell>
                  <TableCell>{player.nationality}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      player.status === 'Ativo' ? 'bg-green-100 text-green-800' : 
                      player.status === 'Lesionado' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {player.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(player)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Editar"
                      >
                        <PenLine size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(player.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Editar Jogador' : 'Adicionar Novo Jogador'}
            </DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para {editingItem ? 'atualizar' : 'registar'} o jogador.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="first_name" className="text-sm font-medium">
                    Primeiro Nome
                  </label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="last_name" className="text-sm font-medium">
                    Último Nome
                  </label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="club" className="text-sm font-medium">
                    Clube
                  </label>
                  <Input
                    id="club"
                    value={formData.club}
                    onChange={(e) => setFormData({...formData, club: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="position" className="text-sm font-medium">
                    Posição
                  </label>
                  <select
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Base">Base</option>
                    <option value="Extremo">Extremo</option>
                    <option value="Ala">Ala</option>
                    <option value="Poste-Baixo">Poste-Baixo</option>
                    <option value="Poste">Poste</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="jersey_number" className="text-sm font-medium">
                    Número
                  </label>
                  <Input
                    id="jersey_number"
                    type="number"
                    value={formData.jersey_number}
                    onChange={(e) => setFormData({...formData, jersey_number: parseInt(e.target.value)})}
                    min="0"
                    max="99"
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="age" className="text-sm font-medium">
                    Idade
                  </label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                    min="16"
                    max="50"
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="nationality" className="text-sm font-medium">
                    Nacionalidade
                  </label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Estado
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="active">Ativo</option>
                  <option value="injured">Lesionado</option>
                  <option value="suspended">Suspenso</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-cv-blue" disabled={loading}>
                {loading ? 'A processar...' : editingItem ? 'Atualizar' : 'Registar'} Jogador
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlayersManagement;
