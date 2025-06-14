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
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting initial session:', error);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
          if (session?.user) {
            await checkAdminStatus(session.user);
          }
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await checkAdminStatus(session.user);
        } else {
          setIsAdmin(false);
        }
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (user: User) => {
    try {
      // Primary check by email - most reliable
      if (user.email === 'admin@fcbb.cv') {
        console.log('Admin detected by email - setting admin status');
        setIsAdmin(true);
        return;
      }

      // Try to fetch from profiles table with aggressive error handling
      let attempts = 0;
      const maxAttempts = 2;
      
      while (attempts < maxAttempts) {
        try {
          console.log(`Attempting to fetch profile, attempt ${attempts + 1}`);
          
          const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .maybeSingle(); // Use maybeSingle to avoid errors if no rows

          if (!error && data && data.role) {
            console.log('Role from database:', data.role);
            setIsAdmin(data.role === 'admin');
            return;
          } else if (error) {
            console.warn('Profile fetch error:', error);
            
            if (error.code === 'PGRST116' || error.message?.includes('no rows')) {
              // Profile doesn't exist, try to create it
              console.log('Profile not found, attempting to create...');
              
              const role = user.email === 'admin@fcbb.cv' ? 'admin' : 'user';
              
              try {
                const { error: insertError } = await supabase
                  .from('profiles')
                  .insert({
                    id: user.id,
                    full_name: user.user_metadata?.full_name || 'Utilizador',
                    role: role
                  });

                if (!insertError) {
                  console.log('Profile created successfully');
                  setIsAdmin(role === 'admin');
                  return;
                } else {
                  console.warn('Profile creation failed:', insertError);
                }
              } catch (insertError) {
                console.warn('Exception during profile creation:', insertError);
              }
            }
          }
          
          attempts++;
          if (attempts < maxAttempts) {
            console.log('Waiting before retry...');
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
          
        } catch (attemptError) {
          console.error('Attempt error:', attemptError);
          attempts++;
          if (attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      }

      // Ultimate fallback - check email again
      console.log('All attempts failed, using email fallback');
      setIsAdmin(user.email === 'admin@fcbb.cv');
      
    } catch (error) {
      console.error('Critical error in checkAdminStatus:', error);
      // Final fallback
      setIsAdmin(user.email === 'admin@fcbb.cv');
    }
  };

  const createAdminUser = async (email: string, password: string, fullName: string) => {
    console.log('Creating admin user:', email);
    
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
        console.error('Error creating admin user:', error);
        return { error };
      }

      console.log('Admin user created successfully');
      return { error: null };
    } catch (err) {
      console.error('Exception creating admin user:', err);
      return { error: err };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!isAdmin) {
      return { error: { message: 'Apenas administradores podem registrar novos usuários' } };
    }

    console.log('Admin creating new user:', email);
    
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
        console.error('Error creating user:', error);
      } else {
        console.log('User created successfully');
      }
      
      return { error };
    } catch (err) {
      console.error('Exception in signUp:', err);
      return { error: err };
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('Attempting sign in:', email);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Sign in error:', error);
      } else {
        console.log('Sign in successful');
      }
      
      return { error };
    } catch (err) {
      console.error('Exception in signIn:', err);
      return { error: err };
    }
  };

  const signOut = async () => {
    console.log('Signing out');
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
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
