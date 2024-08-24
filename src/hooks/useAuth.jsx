import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const { isAuthenticated, user, setUser, login, status, logout } =
    useContext(AuthContext);
  return { isAuthenticated, user, setUser, status, login, logout };
};

export default useAuth;
