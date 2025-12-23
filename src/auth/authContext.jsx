import { createContext, useContext, useState } from "react";
import { loginAdmin } from "./authService";
import { getToken, logout } from "./token";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(!!getToken());

  const login = async (u, p) => {
    await loginAdmin(u, p);
    setIsAuth(true);
  };

  const signOut = () => {
    logout();
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
