import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const PublicRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const auth = useContext(AuthContext);

  return auth && auth.user ? <Navigate to="/" /> : children;
};

export default PublicRoute;
