
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Trash2, Eye, Move } from 'lucide-react';
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

interface GalleryImage {
  id: string;
  image_url: string;
  thumbnail_url: string | null;
  caption: string | null;
  alt_text: string | null;
  order_index: number;
}

interface GalleryImageManagementProps {
  galleryId: string;
  galleryTitle: string;
  onClose: () => void;
}

const GalleryImageManagement: React.FC<GalleryImageManagementProps> = ({
  galleryId,
  galleryTitle,
  onClose
}) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchImages();
  }, [galleryId]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('exec_sql', {
        sql: `
          SELECT id, image_url, thumbnail_url, caption, alt_text, order_index
          FROM gallery_images 
          WHERE gallery_id = $1 
          ORDER BY order_index
        `,
        params: [galleryId]
      });

      if (error) throw error;
      setImages(data || []);
    } catch (error: any) {
      console.log('Fetching images with direct query...');
      // Fallback: use direct query
      try {
        const { data, error } = await supabase
          .from('gallery_images' as any)
          .select('*')
          .eq('gallery_id', galleryId)
          .order('order_index');

        if (error) throw error;
        setImages(data || []);
      } catch (fallbackError: any) {
        toast({
          title: "Erro",
          description: `Erro ao carregar imagens: ${fallbackError.message}`,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        title: "Aviso",
        description: "Selecione pelo menos uma imagem para upload.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const uploadPromises = Array.from(selectedFiles).map(async (file, index) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${galleryId}/${Date.now()}_${index}.${fileExt}`;

        // Upload para Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('gallery-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Obter URL pública
        const { data: { publicUrl } } = supabase.storage
          .from('gallery-images')
          .getPublicUrl(fileName);

        // Salvar na base de dados usando query direta
        const { error: dbError } = await supabase.rpc('exec_sql', {
          sql: `
            INSERT INTO gallery_images (gallery_id, image_url, alt_text, order_index)
            VALUES ($1, $2, $3, $4)
          `,
          params: [galleryId, publicUrl, file.name, images.length + index]
        });

        if (dbError) {
          // Fallback para inserção direta
          const { error: fallbackError } = await supabase
            .from('gallery_images' as any)
            .insert({
              gallery_id: galleryId,
              image_url: publicUrl,
              alt_text: file.name,
              order_index: images.length + index
            });

          if (fallbackError) throw fallbackError;
        }
      });

      await Promise.all(uploadPromises);

      toast({
        title: "Sucesso",
        description: `${selectedFiles.length} imagem(ns) carregada(s) com sucesso.`,
      });

      setSelectedFiles(null);
      await fetchImages();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao carregar imagens: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: string, imageUrl: string) => {
    if (!window.confirm('Tem certeza que deseja eliminar esta imagem?')) return;

    try {
      // Extrair o caminho do ficheiro da URL
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 2] + '/' + urlParts[urlParts.length - 1];

      // Eliminar do storage
      await supabase.storage
        .from('gallery-images')
        .remove([fileName]);

      // Eliminar da base de dados
      try {
        const { error } = await supabase.rpc('exec_sql', {
          sql: 'DELETE FROM gallery_images WHERE id = $1',
          params: [imageId]
        });

        if (error) throw error;
      } catch {
        // Fallback
        const { error } = await supabase
          .from('gallery_images' as any)
          .delete()
          .eq('id', imageId);

        if (error) throw error;
      }

      toast({
        title: "Sucesso",
        description: "Imagem eliminada com sucesso.",
      });

      await fetchImages();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao eliminar imagem: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const updateImageOrder = async (imageId: string, newOrder: number) => {
    try {
      try {
        const { error } = await supabase.rpc('exec_sql', {
          sql: 'UPDATE gallery_images SET order_index = $1 WHERE id = $2',
          params: [newOrder, imageId]
        });

        if (error) throw error;
      } catch {
        // Fallback
        const { error } = await supabase
          .from('gallery_images' as any)
          .update({ order_index: newOrder })
          .eq('id', imageId);

        if (error) throw error;
      }

      await fetchImages();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao reordenar imagem: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const moveImage = (imageId: string, direction: 'up' | 'down') => {
    const image = images.find(img => img.id === imageId);
    if (!image) return;

    const newOrder = direction === 'up' ? image.order_index - 1 : image.order_index + 1;
    updateImageOrder(imageId, newOrder);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gestão de Imagens - {galleryTitle}</DialogTitle>
          <DialogDescription>
            Faça upload e organize as imagens desta galeria.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Selecionar imagens para upload
                  </span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    accept="image/*"
                    onChange={(e) => setSelectedFiles(e.target.files)}
                  />
                </label>
                <p className="mt-2 text-xs text-gray-500">
                  PNG, JPG, JPEG até 10MB cada
                </p>
              </div>
            </div>

            {selectedFiles && selectedFiles.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  {selectedFiles.length} ficheiro(s) selecionado(s)
                </p>
                <Button 
                  onClick={handleFileUpload}
                  disabled={uploading}
                  className="mt-2 bg-cv-blue"
                >
                  {uploading ? 'A carregar...' : 'Fazer Upload'}
                </Button>
              </div>
            )}
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? (
              <div className="col-span-full text-center py-8">Carregando imagens...</div>
            ) : images.length === 0 ? (
              <div className="col-span-full text-center py-8 text-gray-500">
                Nenhuma imagem encontrada
              </div>
            ) : (
              images.map((image, index) => (
                <div key={image.id} className="relative group">
                  <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={image.image_url}
                      alt={image.alt_text || 'Imagem da galeria'}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  {/* Overlay with controls */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => window.open(image.image_url, '_blank')}
                        className="bg-white p-2 rounded-full text-gray-700 hover:text-gray-900"
                        title="Ver imagem"
                      >
                        <Eye size={16} />
                      </button>
                      
                      {index > 0 && (
                        <button
                          onClick={() => moveImage(image.id, 'up')}
                          className="bg-white p-2 rounded-full text-gray-700 hover:text-gray-900"
                          title="Mover para cima"
                        >
                          <Move size={16} className="rotate-180" />
                        </button>
                      )}
                      
                      {index < images.length - 1 && (
                        <button
                          onClick={() => moveImage(image.id, 'down')}
                          className="bg-white p-2 rounded-full text-gray-700 hover:text-gray-900"
                          title="Mover para baixo"
                        >
                          <Move size={16} />
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleDeleteImage(image.id, image.image_url)}
                        className="bg-red-500 p-2 rounded-full text-white hover:bg-red-600"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Order number */}
                  <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    #{image.order_index + 1}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryImageManagement;
