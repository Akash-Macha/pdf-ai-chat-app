import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import axios from '../axios-api';

export const AuthContext = createContext(undefined);

// eslint-disable-next-line react/prop-types -- children prop-types validation is not enforced elsewhere in this codebase (see RequireAuth.jsx, AppLayout.jsx)
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      await axios.get('/me');
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const logout = useCallback(async () => {
    try {
      await axios.post('/logout');
    } finally {
      setIsAuthenticated(false);
    }
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, isLoading, refresh, logout }),
    [isAuthenticated, isLoading, refresh, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
