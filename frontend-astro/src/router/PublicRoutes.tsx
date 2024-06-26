import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import LoaderComponent from "../components/LoaderComponent";

const PublicRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const auth = useContext(AuthContext);

  if (auth?.loading) {
    return <LoaderComponent />;
  }

  return auth && auth.user ? <Navigate to="/" /> : children;
};

export default PublicRoute;
