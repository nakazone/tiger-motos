import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
  email?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin credentials (in production, this would be stored securely on a server)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'tiger2024!',
  role: 'admin' as const,
  email: 'admin@tigermotos.com.br'
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in on app start
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('tiger-motos-user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          // Check if the stored session is still valid (24 hours)
          const sessionExpiry = localStorage.getItem('tiger-motos-session-expiry');
          if (sessionExpiry && Date.now() < parseInt(sessionExpiry)) {
            setUser(userData);
          } else {
            // Session expired, clear storage
            localStorage.removeItem('tiger-motos-user');
            localStorage.removeItem('tiger-motos-session-expiry');
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        localStorage.removeItem('tiger-motos-user');
        localStorage.removeItem('tiger-motos-session-expiry');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check credentials
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        const userData: User = {
          id: '1',
          username: ADMIN_CREDENTIALS.username,
          role: ADMIN_CREDENTIALS.role,
          email: ADMIN_CREDENTIALS.email
        };

        // Set session expiry to 24 hours from now
        const sessionExpiry = Date.now() + (24 * 60 * 60 * 1000);

        // Store user data and session expiry
        localStorage.setItem('tiger-motos-user', JSON.stringify(userData));
        localStorage.setItem('tiger-motos-session-expiry', sessionExpiry.toString());

        setUser(userData);
        return true;
      } else {
        setError('Credenciais inválidas. Verifique o usuário e senha.');
        return false;
      }
    } catch (error) {
      setError('Erro ao fazer login. Tente novamente.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tiger-motos-user');
    localStorage.removeItem('tiger-motos-session-expiry');
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
    error,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 