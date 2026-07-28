import {
  createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode,
} from 'react';
import { clearUser, createUser, getUser, updateUser } from '../api/userStorage';
import type { User } from '../types/user';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (newUser: Partial<User>) => Promise<void>;
  logout: () => void;
  updateProfile: (updatedUser: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser().then((storedUser) => {
      setUser(storedUser);
      setIsLoading(false);
    });
  }, []);

  const login = useCallback(async (newUser: Partial<User>) => {
    const createdUser = await createUser(newUser);
    setUser(createdUser);
  }, []);

  const logout = useCallback(() => {
    clearUser();
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (updatedUser: User) => {
    const savedUser = await updateUser(updatedUser);
    setUser(savedUser);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    logout,
    updateProfile,
  }), [user, isLoading, login, logout, updateProfile]);

  return <AuthContext.Provider value={ value }>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
