
import { useState } from 'react';
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

interface Player {
  id: number;
  name: string;
  club: string;
  position: string;
  number: number;
  age: number;
  nationality: string;
  status: string;
}

const PlayersManagement = () => {
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: 'João Silva', club: 'ABC Basquete', position: 'Base', number: 10, age: 25, nationality: 'Cabo Verde', status: 'Ativo' },
    { id: 2, name: 'Carlos Santos', club: 'Praia Basketball', position: 'Poste', number: 15, age: 28, nationality: 'Cabo Verde', status: 'Ativo' },
    { id: 3, name: 'Pedro Costa', club: 'Mindelo BC', position: 'Extremo', number: 7, age: 22, nationality: 'Cabo Verde', status: 'Lesionado' }
  ]);

  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<Player | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    club: '',
    position: 'Base',
    number: 0,
    age: 0,
    nationality: 'Cabo Verde',
    status: 'Ativo'
  });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', club: '', position: 'Base', number: 0, age: 0, nationality: 'Cabo Verde', status: 'Ativo' });
    setShowDialog(true);
  };

  const handleEdit = (item: Player) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      club: item.club,
      position: item.position,
      number: item.number,
      age: item.age,
      nationality: item.nationality,
      status: item.status
    });
    setShowDialog(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja eliminar este jogador?')) {
      setPlayers(players.filter(item => item.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      setPlayers(players.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData }
          : item
      ));
    } else {
      const newItem: Player = {
        id: Math.max(...players.map(p => p.id)) + 1,
        ...formData
      };
      setPlayers([...players, newItem]);
    }
    
    setShowDialog(false);
    setFormData({ name: '', club: '', position: 'Base', number: 0, age: 0, nationality: 'Cabo Verde', status: 'Ativo' });
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
              <TableHead>ID</TableHead>
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
            {players.map((player) => (
              <TableRow key={player.id}>
                <TableCell>{player.id}</TableCell>
                <TableCell className="font-medium">{player.name}</TableCell>
                <TableCell>{player.club}</TableCell>
                <TableCell>{player.position}</TableCell>
                <TableCell>{player.number}</TableCell>
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
            ))}
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
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nome Completo
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
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
                  <label htmlFor="number" className="text-sm font-medium">
                    Número
                  </label>
                  <Input
                    id="number"
                    type="number"
                    value={formData.number}
                    onChange={(e) => setFormData({...formData, number: parseInt(e.target.value)})}
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
                  <option value="Ativo">Ativo</option>
                  <option value="Lesionado">Lesionado</option>
                  <option value="Suspenso">Suspenso</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-cv-blue">
                {editingItem ? 'Atualizar' : 'Registar'} Jogador
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlayersManagement;
