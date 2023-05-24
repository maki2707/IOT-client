import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';

interface User {
  token: string;
  refreshToken: string;
  name: string;
  customerId: string;
}

interface UserContextValue {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext<UserContextValue>({
  user: {
    token: '',
    refreshToken: '',
    name: '',
    customerId: '',
  },
  setUser: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>(() => {
    // Load initial user data from local storage or set default values
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : { token: '', refreshToken: '', name: '' };
  });

  // Update local storage whenever the user data changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
