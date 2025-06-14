
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useBackendData } from '@/hooks/useBackendData';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Plus, Building, RefreshCw, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import FederationForm from './federations/FederationForm';
import FederationsTable from './federations/FederationsTable';

const FederationsManagement = () => {
  const { 
    federations, 
    federationsLoading, 
    federationsError, 
    operations,
    // Get all errors for comprehensive debugging
    teamsError,
    clubsError,
    competitionsError,
    gamesError,
    playersError,
    newsError,
    eventsError,
    refereesError,
    regionalAssociationsError
  } = useBackendData();
  
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFederation, setEditingFederation] = useState<any>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    acronym: '',
    address: '',
    contact_email: '',
    contact_phone: '',
    website: '',
    logo_url: '',
    foundation_date: ''
  });

  // Simplified Supabase connection test
  useEffect(() => {
    const testSupabaseConnection = async () => {
      try {
        console.log('=== TESTING SUPABASE CONNECTION ===');
        
        // Test 1: Basic connection to federations
        const { data: directFederations, error: directError } = await supabase
          .from('federations')
          .select('*');
        console.log('Direct federations fetch:', { directFederations, directError });
        
        // Test 2: Check current user
        const { data: userData, error: userError } = await supabase.auth.getUser();
        console.log('Current user:', { userData, userError });
        
        setDebugInfo({
          directFetch: { directFederations, directError },
          currentUser: { userData, userError }
        });
        
        console.log('===========================');
      } catch (error: any) {
        console.error('Connection test error:', error);
        setDebugInfo({ error: error.message });
      }
    };

    testSupabaseConnection();
  }, []);

  // Log all errors
  useEffect(() => {
    console.log('=== ALL SYSTEM ERRORS ===');
    console.log('Teams error:', teamsError);
    console.log('Clubs error:', clubsError);
    console.log('Competitions error:', competitionsError);
    console.log('Games error:', gamesError);
    console.log('Players error:', playersError);
    console.log('News error:', newsError);
    console.log('Events error:', eventsError);
    console.log('Referees error:', refereesError);
    console.log('Federations error:', federationsError);
    console.log('Regional Associations error:', regionalAssociationsError);
    console.log('========================');
  }, [teamsError, clubsError, competitionsError, gamesError, playersError, newsError, eventsError, refereesError, federationsError, regionalAssociationsError]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({
        title: "Erro",
        description: "Por favor, preencha o nome da federação.",
        variant: "destructive"
      });
      return;
    }

    try {
      console.log('Creating federation with data:', formData);
      
      if (editingFederation) {
        const result = await operations.federations.update.mutateAsync({ 
          id: editingFederation.id, 
          data: formData 
        });
        console.log('Update result:', result);
        toast({
          title: "Sucesso",
          description: "Federação atualizada com sucesso!"
        });
      } else {
        const result = await operations.federations.create.mutateAsync(formData);
        console.log('Create result:', result);
        toast({
          title: "Sucesso", 
          description: "Federação criada com sucesso!"
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
      
    } catch (error: any) {
      console.error('Error saving federation:', error);
      toast({
        title: "Erro",
        description: `Erro ao salvar federação: ${error.message || 'Erro desconhecido'}`,
        variant: "destructive"
      });
    }
  };

  const handleEdit = (federation: any) => {
    setEditingFederation(federation);
    setFormData({
      name: federation.name || '',
      acronym: federation.acronym || '',
      address: federation.address || '',
      contact_email: federation.contact_email || '',
      contact_phone: federation.contact_phone || '',
      website: federation.website || '',
      logo_url: federation.logo_url || '',
      foundation_date: federation.foundation_date || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (federationId: string) => {
    if (confirm('Tem certeza que deseja eliminar esta federação?')) {
      try {
        await operations.federations.delete.mutateAsync(federationId);
        toast({
          title: "Sucesso",
          description: "Federação eliminada com sucesso!"
        });
      } catch (error: any) {
        console.error('Error deleting federation:', error);
        toast({
          title: "Erro",
          description: `Erro ao eliminar federação: ${error.message || 'Erro desconhecido'}`,
          variant: "destructive"
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      acronym: '',
      address: '',
      contact_email: '',
      contact_phone: '',
      website: '',
      logo_url: '',
      foundation_date: ''
    });
    setEditingFederation(null);
  };

  if (federationsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Carregando federações...</span>
      </div>
    );
  }

  // Show all errors if any exist
  const allErrors = [
    { name: 'Federações', error: federationsError },
    { name: 'Equipas', error: teamsError },
    { name: 'Clubes', error: clubsError },
    { name: 'Competições', error: competitionsError },
    { name: 'Jogos', error: gamesError },
    { name: 'Jogadores', error: playersError },
    { name: 'Notícias', error: newsError },
    { name: 'Eventos', error: eventsError },
    { name: 'Árbitros', error: refereesError },
    { name: 'Associações Regionais', error: regionalAssociationsError }
  ].filter(item => item.error);

  return (
    <div className="space-y-6">
      {/* Show system errors if any */}
      {allErrors.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Erros de Sistema Detectados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {allErrors.map((item, index) => (
                <div key={index} className="text-sm text-red-600">
                  <strong>{item.name}:</strong> {item.error?.message || 'Erro desconhecido'}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cv-blue flex items-center gap-2">
            <Building className="h-6 w-6" />
            Gestão de Federações
          </h2>
          <p className="text-gray-600">Gerir federações de basquetebol</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Recarregar
          </Button>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-cv-blue hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Nova Federação
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingFederation ? 'Editar Federação' : 'Nova Federação'}
                </DialogTitle>
                <DialogDescription>
                  Preencha as informações da federação
                </DialogDescription>
              </DialogHeader>
              <FederationForm
                formData={formData}
                isEditing={!!editingFederation}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                onCancel={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Federações ({federations?.length || 0})</CardTitle>
          <CardDescription>
            Lista de federações de basquetebol
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Enhanced debug info */}
          {debugInfo && (
            <div className="mb-4 p-3 bg-gray-100 rounded text-xs">
              <details>
                <summary className="cursor-pointer font-medium">
                  Informações Técnicas de Debug (clique para expandir)
                </summary>
                <pre className="mt-2 overflow-auto max-h-64">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </details>
            </div>
          )}
          
          {federations?.length > 0 ? (
            <FederationsTable
              federations={federations}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <div className="text-center py-8">
              <Building className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                {federationsError 
                  ? 'Erro ao carregar federações'
                  : 'Nenhuma federação encontrada'
                }
              </h3>
              <p className="text-gray-500 mb-4">
                {federationsError 
                  ? `Erro: ${federationsError.message}`
                  : 'Comece criando a primeira federação'
                }
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeira Federação
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FederationsManagement;
