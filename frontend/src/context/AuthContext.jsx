import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem('codebricks_user');
    return cached ? JSON.parse(cached) : null;
  });
  const [loading, setLoading] = useState(true);

  // On first load, if a token exists, verify it's still valid by fetching /auth/me.
  useEffect(() => {
    const token = localStorage.getItem('codebricks_token');
    if (!token) {
      setLoading(false);
      return;
    }

    authApi
      .me()
      .then((res) => {
        setUser(res.data);
        localStorage.setItem('codebricks_user', JSON.stringify(res.data));
      })
      .catch(() => {
        localStorage.removeItem('codebricks_token');
        localStorage.removeItem('codebricks_user');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const persistSession = (data) => {
    localStorage.setItem('codebricks_token', data.token);
    localStorage.setItem('codebricks_user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const login = useCallback(async (email, password) => {
    const res = await authApi.login({ email, otp });
    persistSession(res.data);
    return res.data.user;
  }, []);

  const register = useCallback(async (name, email, password, password_confirmation) => {
    const res = await authApi.register({ name, email, password, password_confirmation });
    persistSession(res.data);
    return res.data.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // even if the API call fails (e.g. token already expired), clear locally
    }
    localStorage.removeItem('codebricks_token');
    localStorage.removeItem('codebricks_user');
    setUser(null);
  }, []);

  const isSuperAdmin = user?.role === 'super_admin';

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isSuperAdmin, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
