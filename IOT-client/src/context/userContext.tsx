import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
  token: string;
  refreshToken: string;
  name: string;
}

interface UserContextValue {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = createContext<UserContextValue>({
  user: {
    token: '',
    refreshToken: '',
    name: '',
  },
  setUser: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    // Load initial user data from local storage or set default values
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : { token: '', refreshToken: '', name: '' };
  });

  // Update local storage whenever the user data changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
