import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Dashboard from "../components/Dashboard";
import Login from "../components/auth/Login";
import PrivateRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoutes";
import Layout from "../layout/Layout";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <Home />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
