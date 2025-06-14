
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { User, LogOut } from 'lucide-react';

interface Profile {
  id: string;
  full_name: string | null;
  role: string;
  updated_at: string | null;
  avatar_url: string | null;
  club_id: string | null;
  regional_association_id: string | null;
}

const UserProfile = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      setError('');
      
      // Try to fetch profile with retry logic
      let retryCount = 0;
      const maxRetries = 3;
      
      while (retryCount < maxRetries) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) {
            if (error.code === 'PGRST116') {
              // Profile doesn't exist, create it
              const { data: newProfile, error: createError } = await supabase
                .from('profiles')
                .insert({
                  id: user.id,
                  full_name: user.user_metadata?.full_name || 'Utilizador',
                  role: user.email === 'admin@fcbb.cv' ? 'admin' : 'user'
                })
                .select()
                .single();

              if (createError) throw createError;
              
              setProfile(newProfile);
              setFullName(newProfile.full_name || '');
              break;
            } else {
              throw error;
            }
          } else {
            setProfile(data);
            setFullName(data.full_name || '');
            break;
          }
        } catch (retryError: any) {
          retryCount++;
          if (retryCount >= maxRetries) {
            throw retryError;
          }
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      
      // Provide fallback profile data
      const fallbackProfile = {
        id: user.id,
        full_name: user.user_metadata?.full_name || 'Utilizador',
        role: user.email === 'admin@fcbb.cv' ? 'admin' : 'user',
        updated_at: new Date().toISOString(),
        avatar_url: null,
        club_id: null,
        regional_association_id: null
      };
      
      setProfile(fallbackProfile);
      setFullName(fallbackProfile.full_name || '');
      setError('Algumas informações do perfil podem não estar atualizadas.');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || !profile) return;
    
    setUpdating(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({ 
          id: user.id,
          full_name: fullName,
          role: profile.role, // Include the current role
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        });

      if (error) throw error;
      
      setSuccess('Perfil atualizado com sucesso!');
      await fetchProfile();
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setError('Erro ao atualizar perfil. Tente novamente mais tarde.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Perfil do Utilizador
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-500">Email</Label>
              <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Função</Label>
              <p className="mt-1 text-sm text-gray-900 capitalize">{profile?.role}</p>
            </div>
          </div>

          <form onSubmit={updateProfile} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Nome Completo</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Seu nome completo"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-3">
              <Button 
                type="submit" 
                disabled={updating}
                className="bg-cv-blue hover:bg-cv-blue/90"
              >
                {updating ? <LoadingSpinner size="sm" /> : 'Atualizar Perfil'}
              </Button>
              
              <Button 
                type="button" 
                variant="outline"
                onClick={signOut}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
