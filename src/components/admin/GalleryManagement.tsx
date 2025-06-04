
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePlus, PenLine, Trash2, Eye } from 'lucide-react';
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

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  event: string;
  date: string;
  status: string;
  imageCount: number;
}

const GalleryManagement = () => {
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([
    { id: 1, title: 'Final Liga Nacional 2025', description: 'Fotos da final da Liga Nacional', event: 'Liga Nacional', date: '15/04/2025', status: 'Publicado', imageCount: 25 },
    { id: 2, title: 'Workshop Treinadores', description: 'Workshop de formação para treinadores', event: 'Formação', date: '10/03/2025', status: 'Publicado', imageCount: 12 },
    { id: 3, title: 'Seleção Nacional', description: 'Treino da seleção nacional', event: 'Seleções', date: '05/02/2025', status: 'Rascunho', imageCount: 8 }
  ]);

  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event: '',
    status: 'Rascunho'
  });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', description: '', event: '', status: 'Rascunho' });
    setShowDialog(true);
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      event: item.event,
      status: item.status
    });
    setShowDialog(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja eliminar este álbum?')) {
      setGalleryList(galleryList.filter(item => item.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      setGalleryList(galleryList.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData, date: new Date().toLocaleDateString('pt-PT') }
          : item
      ));
    } else {
      const newItem: GalleryItem = {
        id: Math.max(...galleryList.map(g => g.id)) + 1,
        ...formData,
        date: new Date().toLocaleDateString('pt-PT'),
        imageCount: 0
      };
      setGalleryList([...galleryList, newItem]);
    }
    
    setShowDialog(false);
    setFormData({ title: '', description: '', event: '', status: 'Rascunho' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-cv-blue">Gestão de Galeria</h3>
        <Button onClick={handleAdd} className="bg-cv-blue hover:bg-blue-700 flex items-center gap-2">
          <ImagePlus size={18} />
          Adicionar Álbum
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Evento</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Fotos</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {galleryList.map((gallery) => (
              <TableRow key={gallery.id}>
                <TableCell>{gallery.id}</TableCell>
                <TableCell className="max-w-xs truncate">{gallery.title}</TableCell>
                <TableCell>{gallery.event}</TableCell>
                <TableCell>{gallery.date}</TableCell>
                <TableCell>{gallery.imageCount}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    gallery.status === 'Publicado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {gallery.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(gallery)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Editar"
                    >
                      <PenLine size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(gallery.id)}
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
              {editingItem ? 'Editar Álbum' : 'Adicionar Novo Álbum'}
            </DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para {editingItem ? 'atualizar' : 'criar'} o álbum.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Título do Álbum
                </label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="event" className="text-sm font-medium">
                  Evento
                </label>
                <Input
                  id="event"
                  value={formData.event}
                  onChange={(e) => setFormData({...formData, event: e.target.value})}
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
                  <option value="Rascunho">Rascunho</option>
                  <option value="Publicado">Publicado</option>
                  <option value="Arquivado">Arquivado</option>
                </select>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Descrição
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md h-20"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="images" className="text-sm font-medium">
                  Fotos
                </label>
                <input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-500">
                  Selecione várias imagens. Tamanho máximo: 5MB por imagem.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-cv-blue">
                {editingItem ? 'Atualizar' : 'Criar'} Álbum
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryManagement;
