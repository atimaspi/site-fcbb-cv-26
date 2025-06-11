

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useApi } from '@/hooks/useApi';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter,
  Star,
  Calendar
} from 'lucide-react';
import { useForm } from 'react-hook-form';

interface NewsForm {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  featured: boolean;
  published: boolean;
  image_url?: string;
}

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  featured?: boolean;
  published?: boolean;
  image_url?: string;
  created_at: string;
  author?: string;
}

// Type guard function to check if an item is a valid NewsArticle
const isValidNewsArticle = (item: any): item is NewsArticle => {
  return item != null && 
    typeof item === 'object' && 
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    typeof item.content === 'string' &&
    typeof item.category === 'string' &&
    typeof item.created_at === 'string';
};

const NewsManagementAdvanced = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  
  const { useFetch, useCreate, useUpdate, useDelete } = useApi();
  
  const { data: news, isLoading } = useFetch('news');
  const createNews = useCreate('news');
  const updateNews = useUpdate('news');
  const deleteNews = useDelete('news');

  const { register, handleSubmit, reset, setValue } = useForm<NewsForm>();

  const categories = [
    'Liga Nacional',
    'Seleções',
    'Clubes',
    'Formação',
    'Arbitragem',
    'Institucional',
    'Internacional'
  ];

  // Verificação mais segura dos dados com type assertion
  const newsList = React.useMemo(() => {
    if (!news || !Array.isArray(news)) {
      return [] as NewsArticle[];
    }
    
    return news.filter(isValidNewsArticle) as NewsArticle[];
  }, [news]);

  const filteredNews = React.useMemo(() => {
    return newsList.filter((article: NewsArticle) => {
      const matchesSearch = article.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || article.category === filterCategory;
      return matchesSearch && matchesCategory;
    }) as NewsArticle[];
  }, [newsList, searchTerm, filterCategory]);

  const handleCreateNews = async (data: NewsForm) => {
    await createNews.mutateAsync({
      ...data,
      author: 'Admin FCBB',
      status: 'active'
    });
    setIsCreating(false);
    reset();
  };

  const handleEditNews = async (data: NewsForm) => {
    if (!editingId) return;
    await updateNews.mutateAsync({
      id: editingId,
      data: { ...data, updated_at: new Date().toISOString() }
    });
    setEditingId(null);
    reset();
  };

  const handleDeleteNews = async (id: string) => {
    if (confirm('Tem certeza que deseja eliminar esta notícia?')) {
      await deleteNews.mutateAsync(id);
    }
  };

  const startEdit = (article: NewsArticle) => {
    if (!article) return;
    setEditingId(article.id);
    setValue('title', article.title || '');
    setValue('content', article.content || '');
    setValue('excerpt', article.excerpt || '');
    setValue('category', article.category || '');
    setValue('featured', article.featured || false);
    setValue('published', article.published || false);
    setValue('image_url', article.image_url || '');
    setIsCreating(true);
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
          <h2 className="text-2xl font-bold text-cv-blue">Gestão de Notícias</h2>
          <p className="text-gray-600">Criar e gerir conteúdo noticioso</p>
        </div>
        <Button 
          onClick={() => setIsCreating(true)}
          className="bg-cv-blue hover:bg-cv-blue/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Notícia
        </Button>
      </div>

      {/* Filtros e pesquisa */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Pesquisar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Pesquisar notícias..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-48">
              <Label htmlFor="category">Categoria</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulário de criação/edição */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingId ? 'Editar Notícia' : 'Nova Notícia'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(editingId ? handleEditNews : handleCreateNews)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    {...register('title', { required: true })}
                    placeholder="Título da notícia"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select onValueChange={(value) => setValue('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Resumo</Label>
                <Textarea
                  id="excerpt"
                  {...register('excerpt')}
                  placeholder="Breve resumo da notícia"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Conteúdo *</Label>
                <Textarea
                  id="content"
                  {...register('content', { required: true })}
                  placeholder="Conteúdo completo da notícia"
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">URL da Imagem</Label>
                <Input
                  id="image_url"
                  {...register('image_url')}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>

              <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" {...register('featured')} />
                  <span>Notícia em destaque</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" {...register('published')} />
                  <span>Publicar imediatamente</span>
                </label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-cv-blue hover:bg-cv-blue/90">
                  {editingId ? 'Atualizar' : 'Criar'} Notícia
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsCreating(false);
                    setEditingId(null);
                    reset();
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de notícias */}
      <Card>
        <CardHeader>
          <CardTitle>Notícias ({filteredNews.length})</CardTitle>
          <CardDescription>
            Gerir todas as notícias publicadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNews.map((article: NewsArticle) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {article.featured && (
                        <Star className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className="font-medium">{article.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{article.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={article.published ? "default" : "secondary"}>
                      {article.published ? 'Publicado' : 'Rascunho'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="h-3 w-3" />
                      {new Date(article.created_at).toLocaleDateString('pt-PT')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEdit(article)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteNews(article.id)}
                      >
                        <Trash2 className="h-3 w-3" />
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

export default NewsManagementAdvanced;

