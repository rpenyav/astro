import React, { createContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { AuthContextType, User } from "../interfaces/user";
import { getUserById } from "../services/userService";
import LoaderComponent from "../components/LoaderComponent";

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const { sub } = jwtDecode<{ sub: string }>(token);
      getUserById(sub)
        .then(setUser)
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token: string) => {
    const { sub } = jwtDecode<{ sub: string }>(token);
    getUserById(sub)
      .then(setUser)
      .catch(console.error)
      .finally(() => setLoading(false));
    Cookies.set("token", token, { expires: 7 });
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {loading ? <LoaderComponent /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
