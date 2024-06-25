import React, { useContext } from "react";
import AppRouter from "./router";
import { AuthContext } from "./contexts/AuthContext";

const App: React.FC = () => {
  const auth = useContext(AuthContext);

  return <AppRouter />;
};

export default App;
