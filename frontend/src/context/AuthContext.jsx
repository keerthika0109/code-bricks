import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem('codebricks_user');
    return cached ? JSON.parse(cached) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('codebricks_token');
    if (!token) { setLoading(false); return; }

    authApi.me()
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

  // Simple login — email + password only
  const login = useCallback(async (email, password) => {
    const res = await authApi.login({ email, password });
    persistSession(res.data);
    return res.data.user;
  }, []);

  // Register step 1 — send OTP
  const register = useCallback(async (name, email, password, password_confirmation) => {
    await authApi.register({ name, email, password, password_confirmation });
  }, []);

  // Register step 2 — verify OTP, create account
  const verifyRegisterOtp = useCallback(async (email, otp) => {
    const res = await authApi.verifyOtp({ email, otp });
    persistSession(res.data);
    return res.data.user;
  }, []);

  const logout = useCallback(async () => {
    try { await authApi.logout(); } catch { }
    localStorage.removeItem('codebricks_token');
    localStorage.removeItem('codebricks_user');
    setUser(null);
  }, []);

  const isSuperAdmin = user?.role === 'super_admin';

  return (
    <AuthContext.Provider value={{ user, loading, login, register, verifyRegisterOtp, logout, isSuperAdmin, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}