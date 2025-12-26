import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { type Session, type User } from '@supabase/supabase-js';
import { supabase } from '../services/supabaseClient';

type AuthContextValue = {
  user: User | null;
  role: string | null;
  session: Session | null;
  loading: boolean;
  roleLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [roleLoading, setRoleLoading] = useState(false);


  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      sub.subscription.unsubscribe();
    };

  }, []);

  useEffect(() => {
    const fetchRole = async () => {
      if (!user) {
        setRole(null);
        return;
      }

      setRoleLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (!error && data) {
          setRole(data.role);
        } else {
          setRole(null);
        }
      } finally {
        setRoleLoading(false);
      }
    };

    fetchRole();
  }, [user]);


  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, role, session, loading, roleLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error();
  return ctx;
}