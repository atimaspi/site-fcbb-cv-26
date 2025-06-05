
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePlus, PenLine, Trash2 } from 'lucide-react';
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

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  event: string;
  created_at: string;
  status: string;
  image_count: number;
}

const GalleryManagement = () => {
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event: '',
    status: 'draft'
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      console.log('Fetching gallery...');
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Gallery fetch result:', { data, error });

      if (error) {
        console.error('Erro ao carregar galeria:', error);
        throw error;
      }

      const formattedGallery = data?.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description || '',
        event: item.event || '',
        created_at: new Date(item.created_at).toLocaleDateString('pt-PT'),
        status: item.status === 'published' ? 'Publicado' : 'Rascunho',
        image_count: item.image_count || 0
      })) || [];

      console.log('Formatted gallery:', formattedGallery);
      setGalleryList(formattedGallery);
    } catch (error: any) {
      console.error('Erro ao carregar galeria:', error);
      toast({
        title: "Erro",
        description: `Erro ao carregar galeria: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    console.log('Adding new gallery item');
    setEditingItem(null);
    setFormData({ title: '', description: '', event: '', status: 'draft' });
    setShowDialog(true);
  };

  const handleEdit = (item: GalleryItem) => {
    console.log('Editing gallery item:', item);
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      event: item.event,
      status: item.status === 'Publicado' ? 'published' : 'draft'
    });
    setShowDialog(true);
  };

  const handleDelete = async (id: string) => {
    console.log('Delete button clicked for id:', id);
    if (!window.confirm('Tem certeza que deseja eliminar este álbum?')) {
      console.log('Delete cancelled by user');
      return;
    }

    setLoading(true);
    try {
      console.log('Deleting gallery with id:', id);
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Delete error:', error);
        throw error;
      }

      console.log('Gallery deleted successfully');
      toast({
        title: "Sucesso",
        description: "Álbum eliminado com sucesso.",
      });

      await fetchGallery();
    } catch (error: any) {
      console.error('Erro ao eliminar álbum:', error);
      toast({
        title: "Erro",
        description: `Erro ao eliminar álbum: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    setLoading(true);

    try {
      if (editingItem) {
        console.log('Updating gallery with id:', editingItem.id);
        const { data, error } = await supabase
          .from('gallery')
          .update({
            title: formData.title,
            description: formData.description,
            event: formData.event,
            status: formData.status,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingItem.id)
          .select();

        console.log('Update result:', { data, error });

        if (error) {
          console.error('Update error:', error);
          throw error;
        }

        toast({
          title: "Sucesso",
          description: "Álbum atualizado com sucesso.",
        });
      } else {
        console.log('Creating new gallery');
        const { data, error } = await supabase
          .from('gallery')
          .insert({
            title: formData.title,
            description: formData.description,
            event: formData.event,
            status: formData.status,
            image_count: 0
          })
          .select();

        console.log('Insert result:', { data, error });

        if (error) {
          console.error('Insert error:', error);
          throw error;
        }

        toast({
          title: "Sucesso",
          description: "Álbum criado com sucesso.",
        });
      }

      setShowDialog(false);
      setFormData({ title: '', description: '', event: '', status: 'draft' });
      await fetchGallery();
    } catch (error: any) {
      console.error('Erro ao salvar álbum:', error);
      toast({
        title: "Erro",
        description: `Erro ao salvar álbum: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
              <TableHead>Título</TableHead>
              <TableHead>Evento</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Fotos</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Carregando...</TableCell>
              </TableRow>
            ) : galleryList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Nenhum álbum encontrado</TableCell>
              </TableRow>
            ) : (
              galleryList.map((gallery) => (
                <TableRow key={gallery.id}>
                  <TableCell className="max-w-xs truncate">{gallery.title}</TableCell>
                  <TableCell>{gallery.event}</TableCell>
                  <TableCell>{gallery.created_at}</TableCell>
                  <TableCell>{gallery.image_count}</TableCell>
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
              ))
            )}
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
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicado</option>
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
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-cv-blue" disabled={loading}>
                {loading ? 'A processar...' : editingItem ? 'Atualizar' : 'Criar'} Álbum
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryManagement;
