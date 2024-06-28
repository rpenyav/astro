import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useLogout = () => {
  const auth = useContext(AuthContext);

  const logout = () => {
    auth?.logout();
  };

  return {
    user: auth?.user,
    logout,
  };
};

export default useLogout;
