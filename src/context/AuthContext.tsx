import React, { createContext, useContext, useState } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  coins: number;
  tier: string;
  tierProgress: number;
  tierMax: number;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const mockUser: User = {
  id: 'usr_001',
  name: 'Reza Firmansyah',
  email: 'r***a@gmail.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=satset&backgroundColor=blue',
  coins: 34,
  tier: 'Stone',
  tierProgress: 120,
  tierMax: 500,
};

const AuthContext = createContext<AuthContextType>({
  user: mockUser,
  isLoggedIn: true,
  login: async () => { },
  logout: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUser);

  const login = async (_email: string, _password: string) => {
    await new Promise(r => setTimeout(r, 800));
    setUser(mockUser);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
