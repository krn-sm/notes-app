/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getCurrentUser,
  type User,
} from "../services/authService";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  setUser: React.Dispatch<
    React.SetStateAction<User | null>
  >;

  refreshUser: () => Promise<void>;
};

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined,
  );

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({
  children,
}: AuthProviderProps) => {
  const [user, setUser] =
    useState<User | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const refreshUser = async () => {
    try {
      const currentUser =
        await getCurrentUser();

      setUser(currentUser);
    } catch {
  setUser(null);
}
  };

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);

      await refreshUser();

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const value: AuthContextType = {
    user,

    isLoading,

    isAuthenticated: Boolean(user),

    setUser,

    refreshUser,
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider",
    );
  }

  return context;
};