import { createContext, useState, useContext, type ReactNode } from 'react';

// 1. Definir los tipos que usará el contexto
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

// 2. Crear el Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Crear el componente Proveedor (Provider)
// Esta es la exportación principal que el linter de Fast Refresh espera.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Crear y exportar el hook personalizado.
// Esta es la segunda exportación que causa el warning de Fast Refresh.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};;
