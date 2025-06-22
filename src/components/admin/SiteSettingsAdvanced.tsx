
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApi } from '@/hooks/useApi';
import { Save, Mail, Phone, Globe, Facebook, Instagram, Youtube, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SiteSettingsAdvanced = () => {
  const { useFetch, useUpdate } = useApi();
  const { data: settings = [], isLoading } = useFetch('site_settings');
  const updateSetting = useUpdate('site_settings');
  const { toast } = useToast();

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (Array.isArray(settings) && settings.length > 0) {
      const settingsObj = settings.reduce((acc: Record<string, string>, setting: any) => {
        acc[setting.setting_key] = setting.setting_value;
        return acc;
      }, {});
      setFormData(settingsObj);
    }
  }, [settings]);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = async (settingKey: string) => {
    try {
      if (Array.isArray(settings)) {
        const setting = settings.find((s: any) => s.setting_key === settingKey);
        if (setting && setting.id) {
          await updateSetting.mutateAsync({
            id: setting.id,
            data: { setting_value: formData[settingKey] }
          });
          setHasChanges(false);
          toast({
            title: "Sucesso",
            description: "Configuração atualizada com sucesso!",
          });
        }
      }
    } catch (error) {
      console.error('Erro ao salvar configuração:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar configuração",
        variant: "destructive",
      });
    }
  };

  const handleSaveAll = async () => {
    try {
      if (Array.isArray(settings)) {
        const updates = settings.map((setting: any) => 
          updateSetting.mutateAsync({
            id: setting.id,
            data: { setting_value: formData[setting.setting_key] || setting.setting_value }
          })
        );
        
        await Promise.all(updates);
        setHasChanges(false);
        toast({
          title: "Sucesso",
          description: "Todas as configurações foram atualizadas!",
        });
      }
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar configurações",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Carregando configurações...</div>;
  }

  if (!Array.isArray(settings)) {
    return <div>Erro ao carregar configurações</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cv-blue">Configurações do Site</h2>
          <p className="text-gray-600">Gerir informações gerais e de contacto</p>
        </div>
        {hasChanges && (
          <Button onClick={handleSaveAll} className="bg-cv-blue hover:bg-cv-blue/90">
            <Save className="h-4 w-4 mr-2" />
            Salvar Todas
          </Button>
        )}
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">
            <Settings className="h-4 w-4 mr-2" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Mail className="h-4 w-4 mr-2" />
            Contacto
          </TabsTrigger>
          <TabsTrigger value="social">
            <Globe className="h-4 w-4 mr-2" />
            Redes Sociais
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
              <CardDescription>Configurações básicas do site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site_title">Título do Site</Label>
                <Input
                  id="site_title"
                  value={formData.site_title || ''}
                  onChange={(e) => handleChange('site_title', e.target.value)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSave('site_title')}
                  className="mt-2"
                >
                  <Save className="h-3 w-3 mr-1" />
                  Salvar
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="site_description">Descrição do Site</Label>
                <Textarea
                  id="site_description"
                  value={formData.site_description || ''}
                  onChange={(e) => handleChange('site_description', e.target.value)}
                  rows={3}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSave('site_description')}
                  className="mt-2"
                >
                  <Save className="h-3 w-3 mr-1" />
                  Salvar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contacto</CardTitle>
              <CardDescription>Email, telefone e outros contactos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact_email">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email de Contacto
                </Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={formData.contact_email || ''}
                  onChange={(e) => handleChange('contact_email', e.target.value)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSave('contact_email')}
                  className="mt-2"
                >
                  <Save className="h-3 w-3 mr-1" />
                  Salvar
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact_phone">
                  <Phone className="h-4 w-4 inline mr-2" />
                  Telefone de Contacto
                </Label>
                <Input
                  id="contact_phone"
                  value={formData.contact_phone || ''}
                  onChange={(e) => handleChange('contact_phone', e.target.value)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSave('contact_phone')}
                  className="mt-2"
                >
                  <Save className="h-3 w-3 mr-1" />
                  Salvar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Redes Sociais</CardTitle>
              <CardDescription>Links para redes sociais da FCBB</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="social_facebook">
                  <Facebook className="h-4 w-4 inline mr-2" />
                  Facebook URL
                </Label>
                <Input
                  id="social_facebook"
                  value={formData.social_facebook || ''}
                  onChange={(e) => handleChange('social_facebook', e.target.value)}
                  placeholder="https://facebook.com/fcbb.cv"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSave('social_facebook')}
                  className="mt-2"
                >
                  <Save className="h-3 w-3 mr-1" />
                  Salvar
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="social_instagram">
                  <Instagram className="h-4 w-4 inline mr-2" />
                  Instagram URL
                </Label>
                <Input
                  id="social_instagram"
                  value={formData.social_instagram || ''}
                  onChange={(e) => handleChange('social_instagram', e.target.value)}
                  placeholder="https://instagram.com/fcbb.cv"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSave('social_instagram')}
                  className="mt-2"
                >
                  <Save className="h-3 w-3 mr-1" />
                  Salvar
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="social_youtube">
                  <Youtube className="h-4 w-4 inline mr-2" />
                  YouTube URL
                </Label>
                <Input
                  id="social_youtube"
                  value={formData.social_youtube || ''}
                  onChange={(e) => handleChange('social_youtube', e.target.value)}
                  placeholder="https://youtube.com/@fcbb.cv"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSave('social_youtube')}
                  className="mt-2"
                >
                  <Save className="h-3 w-3 mr-1" />
                  Salvar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteSettingsAdvanced;
