import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRouteBackoffice: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const auth = useContext(AuthContext);

  if (auth?.loading) {
    return <div>Loading...</div>;
  }

  if (!auth?.user) {
    return <Navigate to="/login" />;
  }

  if (auth.user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRouteBackoffice;
