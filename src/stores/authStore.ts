
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  handleAuthCallback: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,

      signIn: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (error) throw error;
          
          if (data.user) {
            set({
              user: {
                id: data.user.id,
                email: data.user.email!,
                name: data.user.user_metadata?.name || data.user.email!,
                avatar: data.user.user_metadata?.avatar_url,
              },
              isAuthenticated: true,
            });
          }
        } catch (error) {
          console.error('Sign in error:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      signUp: async (email: string, password: string, name: string) => {
        set({ isLoading: true });
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                name,
              },
            },
          });
          
          if (error) throw error;
          
          if (data.user) {
            set({
              user: {
                id: data.user.id,
                email: data.user.email!,
                name: name,
                avatar: data.user.user_metadata?.avatar_url,
              },
              isAuthenticated: true,
            });
          }
        } catch (error) {
          console.error('Sign up error:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      signOut: async () => {
        set({ isLoading: true });
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          
          set({
            user: null,
            isAuthenticated: false,
          });
        } catch (error) {
          console.error('Sign out error:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      signInWithGoogle: async () => {
        set({ isLoading: true });
        try {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: `${window.location.origin}/auth/callback`,
            },
          });
          
          if (error) throw error;
        } catch (error) {
          console.error('Google sign in error:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      handleAuthCallback: async () => {
        set({ isLoading: true });
        try {
          const { data, error } = await supabase.auth.getSession();
          
          if (error) throw error;
          
          if (data.session?.user) {
            const user = data.session.user;
            set({
              user: {
                id: user.id,
                email: user.email!,
                name: user.user_metadata?.name || user.email!,
                avatar: user.user_metadata?.avatar_url,
              },
              isAuthenticated: true,
            });
          }
        } catch (error) {
          console.error('Auth callback error:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            set({
              user: {
                id: session.user.id,
                email: session.user.email!,
                name: session.user.user_metadata?.name || session.user.email!,
                avatar: session.user.user_metadata?.avatar_url,
              },
              isAuthenticated: true,
            });
          }
        } catch (error) {
          console.error('Check auth error:', error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
