import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import LoaderComponent from "../components/LoaderComponent";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const auth = useContext(AuthContext);

  if (auth?.loading) {
    return <LoaderComponent />; // Mostrar un indicador de carga mientras se verifica la autenticación
  }

  return auth && auth.user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
