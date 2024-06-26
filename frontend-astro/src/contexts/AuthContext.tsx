import React, { createContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";
import { AuthContextType, User } from "../interfaces/user";

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const decoded: any = jwtDecode(token);
      const userId = decoded.sub;

      const fetchUser = async () => {
        try {
          const response = await api.get(`/auth/${userId}`);
          setUser({ ...response.data, _id: userId, role: decoded.role }); // Incluye el rol en el estado del usuario
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token: string) => {
    const decoded: any = jwtDecode(token);
    const userId = decoded.sub;

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    Cookies.set("token", token);

    const fetchUser = async () => {
      try {
        const response = await api.get(`/auth/${userId}`);
        setUser({ ...response.data, _id: userId, role: decoded.role }); // Incluye el rol en el estado del usuario
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("token");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
