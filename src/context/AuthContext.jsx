import { createContext,useContext,useEffect,useState } from "react";
import { getAccessToken,logout } from "../auth/auth";
import { loginAdmin } from "../services/authService";

const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    useEffect(() => {
        const token = getAccessToken();
        setIsAuthenticated(!!token);
    }, []);
    const login = async (username,password) => {
        await loginAdmin(username,password);
        setIsAuthenticated(true);
    };
    const signOut = () => {
        logout();
        setIsAuthenticated(false);
    };
    return (
        <AuthContext.Provider value={{isAuthenticated,login,signOut}}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);
