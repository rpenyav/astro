import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { useAuth } from "../contexts/authContext";
import Dashboard from "../screens/Dashboard";
import Login from "../screens/LoginScreen";
import Register from "../screens/Register";
import InsideDrawerContent from "./InsideDrawerContent";
import Predicciones from "../screens/Predicciones";
import CartaAstral from "../screens/CartaAstral";
import Compatibilidad from "../screens/Compatibilidad";
import Articulos from "../screens/Articulos";
import ArticuloDetalle from "../screens/ArticuloDetalle";
import Profile from "../screens/Profile";
import CompatibleDetalle from "../screens/CompatibleDetalle";
import CartaAstralDetalle from "../screens/CartaAstralDetalle";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        headerShown: false,
        ...TransitionPresets.FadeFromBottomAndroid,
      }}
    />
    <Stack.Screen
      name="Register"
      component={Register}
      options={{
        headerShown: false,
        ...TransitionPresets.FadeFromBottomAndroid,
      }}
    />
  </Stack.Navigator>
);

const DashboardStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        headerShown: false,
        ...TransitionPresets.FadeFromBottomAndroid,
      }}
    />
    <Stack.Screen
      name="Predicciones"
      component={Predicciones}
      options={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />
    <Stack.Screen
      name="CartaAstral"
      component={CartaAstral}
      options={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />
    <Stack.Screen
      name="CartaAstralDetalle"
      component={CartaAstralDetalle}
      options={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />
    <Stack.Screen
      name="Compatibilidad"
      component={Compatibilidad}
      options={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />
    <Stack.Screen
      name="Articulos"
      component={Articulos}
      options={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />
    <Stack.Screen
      name="ArticuloDetalle"
      component={ArticuloDetalle}
      options={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />
    <Stack.Screen
      name="CompatibleDetalle"
      component={CompatibleDetalle}
      options={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? (
        <Drawer.Navigator
          drawerContent={(props) => <InsideDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="DashboardStack"
            component={DashboardStack}
            options={{ headerShown: false, title: "Dashboard" }}
          />
        </Drawer.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
