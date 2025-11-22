import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';

interface User {
  id: string;
  name: string;
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = authService.getCurrentUser();
      const token = authService.getToken();

      if (token && currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    setUser(response.user);
    return response;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  const isAuthenticated = (): boolean => {
    return authService.isAuthenticated();
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
  };
};
