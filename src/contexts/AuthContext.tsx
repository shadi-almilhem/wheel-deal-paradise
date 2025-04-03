
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

// This will be replaced with Supabase auth when integrated
export type User = {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data (to be replaced with Supabase)
const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    name: "Admin User",
    isAdmin: true,
  },
  {
    id: "2",
    email: "user@example.com",
    name: "Regular User",
    isAdmin: false,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for saved user session
    const savedUser = localStorage.getItem("carUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email (password is not checked in mock version)
      const foundUser = MOCK_USERS.find(u => u.email === email);
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem("carUser", JSON.stringify(foundUser));
        toast.success("Login successful!");
      } else {
        toast.error("Invalid email or password!");
      }
    } catch (error) {
      toast.error("Failed to login!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const userExists = MOCK_USERS.some(u => u.email === email);
      
      if (userExists) {
        toast.error("User already exists!");
        return;
      }
      
      // Create new user (not actually added to MOCK_USERS in this demo)
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        email,
        name,
        isAdmin: false,
      };
      
      setUser(newUser);
      localStorage.setItem("carUser", JSON.stringify(newUser));
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Failed to register!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("carUser");
    toast.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
