import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { AuthContextType, User, UserToken } from "../interfaces/user";
import { fetchUserData } from "../services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [usertoken, setUserToken] = useState<UserToken | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode<{ sub: string }>(token);

        setUserToken({
          ...decodedToken,
          token,
          _id: "",
          name: "",
          email: "",
          role: "",
        });
        const userData = await fetchUserData(decodedToken.sub);
        setUser(userData);
      }
    } catch (error) {
      console.error("Failed to load user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (token: string): Promise<void> => {
    try {
      const decodedToken = jwtDecode<{ sub: string }>(token);

      setUserToken({
        ...decodedToken,
        token,
        _id: "",
        name: "",
        email: "",
        role: "",
      });
      await AsyncStorage.setItem("token", token);
      const userData = await fetchUserData(decodedToken.sub);
      setUser(userData);
    } catch (error) {
      console.error("Failed to decode and store token:", error);
    }
  };

  const logout = async (): Promise<void> => {
    setUserToken(null);
    setUser(null);
    await AsyncStorage.removeItem("token");
  };

  const authContextValue = useMemo(
    () => ({ user, usertoken, login, logout, loading }),
    [user, usertoken, loading]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
