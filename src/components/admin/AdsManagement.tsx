
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LayoutGrid, PenLine, Trash2, Eye } from 'lucide-react';
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

interface AdItem {
  id: number;
  title: string;
  link: string;
  position: string;
  status: string;
  startDate: string;
  endDate: string;
  clicks: number;
}

const AdsManagement = () => {
  const [adsList, setAdsList] = useState<AdItem[]>([
    { id: 1, title: 'Patrocínio Nike', link: 'https://nike.com', position: 'Cabeçalho', status: 'Ativo', startDate: '01/01/2025', endDate: '31/12/2025', clicks: 1250 },
    { id: 2, title: 'Parceria Banco CV', link: 'https://bcv.cv', position: 'Sidebar', status: 'Ativo', startDate: '15/03/2025', endDate: '15/09/2025', clicks: 890 },
    { id: 3, title: 'Promoção Equipamentos', link: 'https://store.com', position: 'Rodapé', status: 'Inativo', startDate: '01/02/2025', endDate: '28/02/2025', clicks: 456 }
  ]);

  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<AdItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    position: 'sidebar',
    status: 'Inativo',
    startDate: '',
    endDate: ''
  });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', link: '', position: 'sidebar', status: 'Inativo', startDate: '', endDate: '' });
    setShowDialog(true);
  };

  const handleEdit = (item: AdItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      link: item.link,
      position: item.position,
      status: item.status,
      startDate: item.startDate,
      endDate: item.endDate
    });
    setShowDialog(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja eliminar este anúncio?')) {
      setAdsList(adsList.filter(item => item.id !== id));
    }
  };

  const toggleStatus = (id: number) => {
    setAdsList(adsList.map(item => 
      item.id === id 
        ? { ...item, status: item.status === 'Ativo' ? 'Inativo' : 'Ativo' }
        : item
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      setAdsList(adsList.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData }
          : item
      ));
    } else {
      const newItem: AdItem = {
        id: Math.max(...adsList.map(a => a.id)) + 1,
        ...formData,
        clicks: 0
      };
      setAdsList([...adsList, newItem]);
    }
    
    setShowDialog(false);
    setFormData({ title: '', link: '', position: 'sidebar', status: 'Inativo', startDate: '', endDate: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-cv-blue">Gestão de Publicidade</h3>
        <Button onClick={handleAdd} className="bg-cv-blue hover:bg-blue-700 flex items-center gap-2">
          <LayoutGrid size={18} />
          Adicionar Anúncio
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Posição</TableHead>
              <TableHead>Período</TableHead>
              <TableHead>Cliques</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adsList.map((ad) => (
              <TableRow key={ad.id}>
                <TableCell>{ad.id}</TableCell>
                <TableCell className="max-w-xs truncate">{ad.title}</TableCell>
                <TableCell>{ad.position}</TableCell>
                <TableCell className="text-sm">
                  {ad.startDate} - {ad.endDate}
                </TableCell>
                <TableCell>{ad.clicks}</TableCell>
                <TableCell>
                  <button
                    onClick={() => toggleStatus(ad.id)}
                    className={`px-2 py-1 rounded-full text-xs cursor-pointer ${
                      ad.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {ad.status}
                  </button>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(ad)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Editar"
                    >
                      <PenLine size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(ad.id)}
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
              {editingItem ? 'Editar Anúncio' : 'Adicionar Novo Anúncio'}
            </DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para {editingItem ? 'atualizar' : 'criar'} o anúncio.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Título do Anúncio
                </label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="link" className="text-sm font-medium">
                  Link
                </label>
                <Input
                  id="link"
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                  placeholder="https://..."
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
                  <option value="header">Cabeçalho</option>
                  <option value="sidebar">Barra Lateral</option>
                  <option value="footer">Rodapé</option>
                  <option value="content">Entre Conteúdo</option>
                </select>
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
                  <option value="Inativo">Inativo</option>
                  <option value="Ativo">Ativo</option>
                </select>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="adImage" className="text-sm font-medium">
                  Imagem do Anúncio
                </label>
                <input
                  id="adImage"
                  type="file"
                  accept="image/*"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-500">
                  Formatos recomendados: Banner (728x90), Retângulo (300x250)
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-cv-blue">
                {editingItem ? 'Atualizar' : 'Criar'} Anúncio
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdsManagement;
