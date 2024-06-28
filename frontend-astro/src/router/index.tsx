import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Dashboard from "../components/Dashboard";
import Login from "../components/auth/Login";
import Layout from "../layout/Layout";
import CartaAstral from "../components/CartaAstral";
import Compatibilidad from "../components/Compatibilidad";
import ContentList from "../components/ContentList";
import NotFound from "../components/NotFound";
import PrivateRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoutes";

import ManageUsers from "../backoffice/ManageUsers";
import PrivateRouteBackoffice from "../backoffice/PrivateRouteBackoffice";
import BackofficeLayout from "../backoffice/layout/BackofficeLayout";
import ManageAstralCharts from "../backoffice/ManageAstralCharts";
import ManageContents from "../backoffice/ManageContents";
import ManagePredictions from "../backoffice/ManagePredictions";
import Register from "../components/auth/Register";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
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
        <Route
          path="/carta-astral"
          element={
            <PrivateRoute>
              <Layout>
                <CartaAstral />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/compatibilidad"
          element={
            <PrivateRoute>
              <Layout>
                <Compatibilidad />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/contents"
          element={
            <PrivateRoute>
              <Layout>
                <ContentList />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/backoffice"
          element={
            <PrivateRouteBackoffice>
              <BackofficeLayout>
                <ManageUsers />
              </BackofficeLayout>
            </PrivateRouteBackoffice>
          }
        />
        <Route
          path="/backoffice/users"
          element={
            <PrivateRouteBackoffice>
              <BackofficeLayout>
                <ManageUsers />
              </BackofficeLayout>
            </PrivateRouteBackoffice>
          }
        />
        <Route
          path="/backoffice/predictions"
          element={
            <PrivateRouteBackoffice>
              <BackofficeLayout>
                <ManagePredictions />
              </BackofficeLayout>
            </PrivateRouteBackoffice>
          }
        />
        <Route
          path="/backoffice/contents"
          element={
            <PrivateRouteBackoffice>
              <BackofficeLayout>
                <ManageContents />
              </BackofficeLayout>
            </PrivateRouteBackoffice>
          }
        />
        <Route
          path="/backoffice/astral-charts"
          element={
            <PrivateRouteBackoffice>
              <BackofficeLayout>
                <ManageAstralCharts />
              </BackofficeLayout>
            </PrivateRouteBackoffice>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
