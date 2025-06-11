
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
  isAdmin: boolean;
  createAdminUser: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Configurar listener de mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await checkAdminStatus(session.user.id);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    // Verificar sessão existente
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    try {
      console.log('Verificando status de admin para:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (!error && data) {
        console.log('Role do usuário:', data.role);
        setIsAdmin(data.role === 'admin');
      } else {
        console.log('Erro ao verificar role ou usuário sem perfil:', error);
        setIsAdmin(false);
      }
    } catch (error) {
      console.log('Erro ao verificar status de admin:', error);
      setIsAdmin(false);
    }
  };

  const createAdminUser = async (email: string, password: string, fullName: string) => {
    console.log('Criando usuário admin:', email);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });
      
      if (error) {
        console.log('Erro no registro:', error);
        return { error };
      }

      if (data.user) {
        console.log('Usuário criado, promovendo a admin:', data.user.id);
        
        // Aguardar um pouco para o trigger criar o perfil
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Promover o usuário a admin
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ role: 'admin' })
          .eq('id', data.user.id);
        
        if (profileError) {
          console.log('Erro ao promover usuário a admin:', profileError);
          return { error: profileError };
        } else {
          console.log('Usuário promovido a admin com sucesso');
        }
      }
      
      return { error: null };
    } catch (err) {
      console.log('Erro geral na criação:', err);
      return { error: err };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    // Verificar se o usuário atual é admin
    if (!isAdmin) {
      return { error: { message: 'Apenas administradores podem registrar novos usuários' } };
    }

    console.log('Admin criando novo usuário:', email);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });
      
      if (error) {
        console.log('Erro ao criar usuário:', error);
      } else {
        console.log('Usuário criado com sucesso');
      }
      
      return { error };
    } catch (err) {
      console.log('Erro geral no signUp:', err);
      return { error: err };
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('Tentando fazer login:', email);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      console.log('Erro no login:', error);
    } else {
      console.log('Login realizado com sucesso');
    }
    
    return { error };
  };

  const signOut = async () => {
    console.log('Fazendo logout');
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    signUp,
    signIn,
    signOut,
    loading,
    isAdmin,
    createAdminUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
