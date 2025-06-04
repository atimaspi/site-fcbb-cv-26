
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenLine, Plus, Trash2, Eye } from 'lucide-react';
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

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  category: string;
  status: string;
  author: string;
}

const NewsManagement = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([
    { id: 1, title: 'ABC vence a SuperTaça de Cabo Verde 2025', content: 'O ABC conquistou...', date: '23/03/2025', category: 'Competições', status: 'Publicado', author: 'Admin' },
    { id: 2, title: 'Seleção Nacional convoca 20 jogadores', content: 'A seleção nacional...', date: '20/03/2025', category: 'Seleções', status: 'Publicado', author: 'Admin' },
    { id: 3, title: 'Final Four da Liga Nacional', content: 'A Final Four...', date: '15/03/2025', category: 'Competições', status: 'Rascunho', author: 'Admin' }
  ]);

  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Competições',
    status: 'Rascunho'
  });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', content: '', category: 'Competições', status: 'Rascunho' });
    setShowDialog(true);
  };

  const handleEdit = (item: NewsItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      content: item.content,
      category: item.category,
      status: item.status
    });
    setShowDialog(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja eliminar esta notícia?')) {
      setNewsList(newsList.filter(item => item.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      // Update existing
      setNewsList(newsList.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData, date: new Date().toLocaleDateString('pt-PT') }
          : item
      ));
    } else {
      // Add new
      const newItem: NewsItem = {
        id: Math.max(...newsList.map(n => n.id)) + 1,
        ...formData,
        date: new Date().toLocaleDateString('pt-PT'),
        author: 'Admin'
      };
      setNewsList([...newsList, newItem]);
    }
    
    setShowDialog(false);
    setFormData({ title: '', content: '', category: 'Competições', status: 'Rascunho' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-cv-blue">Gestão de Notícias</h3>
        <Button onClick={handleAdd} className="bg-cv-blue hover:bg-blue-700 flex items-center gap-2">
          <Plus size={18} />
          Adicionar Notícia
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {newsList.map((news) => (
              <TableRow key={news.id}>
                <TableCell>{news.id}</TableCell>
                <TableCell className="max-w-xs truncate">{news.title}</TableCell>
                <TableCell>{news.date}</TableCell>
                <TableCell>{news.category}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    news.status === 'Publicado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {news.status}
                  </span>
                </TableCell>
                <TableCell>{news.author}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(news)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Editar"
                    >
                      <PenLine size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(news.id)}
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
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Editar Notícia' : 'Adicionar Nova Notícia'}
            </DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para {editingItem ? 'atualizar' : 'adicionar'} a notícia.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Título da Notícia
                </label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Categoria
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Competições">Competições</option>
                  <option value="Seleções">Seleções</option>
                  <option value="Formação">Formação</option>
                  <option value="Arbitragem">Arbitragem</option>
                  <option value="Clubes">Clubes</option>
                </select>
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
                  <option value="Rascunho">Rascunho</option>
                  <option value="Publicado">Publicado</option>
                  <option value="Arquivado">Arquivado</option>
                </select>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="content" className="text-sm font-medium">
                  Conteúdo
                </label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md h-32"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-cv-blue">
                {editingItem ? 'Atualizar' : 'Criar'} Notícia
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewsManagement;
