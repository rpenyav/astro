import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./navigation/AppNavigator";
import { AuthProvider } from "./contexts/authContext";

const App = () => {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigator />
      </GestureHandlerRootView>
    </AuthProvider>
  );
};

export default App;
