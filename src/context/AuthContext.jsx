import { createContext,useContext,useEffect,useState } from "react";
import { getAccessToken,logout } from "../auth/auth";
import { loginAdmin } from "../services/authService";

const AuthContext = createContext();
