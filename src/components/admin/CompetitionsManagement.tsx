
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trophy, PenLine, Trash2, Plus } from 'lucide-react';
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

interface Competition {
  id: number;
  name: string;
  type: string;
  season: string;
  startDate: string;
  endDate: string;
  teams: number;
  status: string;
}

const CompetitionsManagement = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([
    { id: 1, name: 'Liga Nacional 2025', type: 'Liga', season: '2024/2025', startDate: '01/02/2025', endDate: '30/06/2025', teams: 12, status: 'Em Curso' },
    { id: 2, name: 'Taça de Cabo Verde 2025', type: 'Taça', season: '2024/2025', startDate: '15/03/2025', endDate: '15/05/2025', teams: 16, status: 'Agendado' },
    { id: 3, name: 'Super Taça 2025', type: 'Super Taça', season: '2024/2025', startDate: '10/07/2025', endDate: '10/07/2025', teams: 2, status: 'Agendado' }
  ]);

  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<Competition | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Liga',
    season: '2024/2025',
    startDate: '',
    endDate: '',
    teams: 0,
    status: 'Agendado'
  });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', type: 'Liga', season: '2024/2025', startDate: '', endDate: '', teams: 0, status: 'Agendado' });
    setShowDialog(true);
  };

  const handleEdit = (item: Competition) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      type: item.type,
      season: item.season,
      startDate: item.startDate,
      endDate: item.endDate,
      teams: item.teams,
      status: item.status
    });
    setShowDialog(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja eliminar esta competição?')) {
      setCompetitions(competitions.filter(item => item.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      setCompetitions(competitions.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData }
          : item
      ));
    } else {
      const newItem: Competition = {
        id: Math.max(...competitions.map(c => c.id)) + 1,
        ...formData
      };
      setCompetitions([...competitions, newItem]);
    }
    
    setShowDialog(false);
    setFormData({ name: '', type: 'Liga', season: '2024/2025', startDate: '', endDate: '', teams: 0, status: 'Agendado' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-cv-blue">Gestão de Competições</h3>
        <Button onClick={handleAdd} className="bg-cv-blue hover:bg-blue-700 flex items-center gap-2">
          <Plus size={18} />
          Adicionar Competição
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Época</TableHead>
              <TableHead>Período</TableHead>
              <TableHead>Equipas</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {competitions.map((comp) => (
              <TableRow key={comp.id}>
                <TableCell>{comp.id}</TableCell>
                <TableCell className="max-w-xs truncate">{comp.name}</TableCell>
                <TableCell>{comp.type}</TableCell>
                <TableCell>{comp.season}</TableCell>
                <TableCell className="text-sm">
                  {comp.startDate} - {comp.endDate}
                </TableCell>
                <TableCell>{comp.teams}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    comp.status === 'Em Curso' ? 'bg-green-100 text-green-800' : 
                    comp.status === 'Agendado' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {comp.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(comp)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Editar"
                    >
                      <PenLine size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(comp.id)}
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
              {editingItem ? 'Editar Competição' : 'Adicionar Nova Competição'}
            </DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para {editingItem ? 'atualizar' : 'criar'} a competição.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nome da Competição
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
                  <label htmlFor="type" className="text-sm font-medium">
                    Tipo
                  </label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Liga">Liga</option>
                    <option value="Taça">Taça</option>
                    <option value="Super Taça">Super Taça</option>
                    <option value="Torneio">Torneio</option>
                  </select>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="season" className="text-sm font-medium">
                    Época
                  </label>
                  <Input
                    id="season"
                    value={formData.season}
                    onChange={(e) => setFormData({...formData, season: e.target.value})}
                    placeholder="2024/2025"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="startDate" className="text-sm font-medium">
                    Data Início
                  </label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="endDate" className="text-sm font-medium">
                    Data Fim
                  </label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="teams" className="text-sm font-medium">
                    Número de Equipas
                  </label>
                  <Input
                    id="teams"
                    type="number"
                    value={formData.teams}
                    onChange={(e) => setFormData({...formData, teams: parseInt(e.target.value)})}
                    min="2"
                    required
                  />
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
                    <option value="Agendado">Agendado</option>
                    <option value="Em Curso">Em Curso</option>
                    <option value="Concluído">Concluído</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-cv-blue">
                {editingItem ? 'Atualizar' : 'Criar'} Competição
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompetitionsManagement;
