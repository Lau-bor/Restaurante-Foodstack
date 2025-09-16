import { createContext, useContext, useState, useEffect } from "react";
import * as authService from "../services/AuthServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const getToken = () => localStorage.getItem("token");

  const register = async (userData) => {
    return await authService.register(userData);
  };

  const login = async (credentials) => {
    try {
      const { token, user } = await authService.login(credentials);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);
      setRole(user.role);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  };

  const logout = () => {
    const token = getToken();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    setRole(null);
    setProfileImage(null);

    if (token) {
      fetch(`${import.meta.env.VITE_API_URL}/api/v1/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch(err => console.error("API logout call failed:", err));
    }
  };

  const getProfile = async () => {
    try {
      const data = await authService.profile();
      setCurrentUser(data);
      setRole(data.role);
      if (data.profileImage) {
        setProfileImage(`http://localhost:4000${data.profileImage}`);
      }
    } catch (error) {
       console.error("Failed to get profile, logging out.", error);
       logout();
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = getToken();

        if (!token) {
          setLoading(false);
          return;
        }

        const localUser = localStorage.getItem("user");
        if(localUser) {
            const user = JSON.parse(localUser);
            setCurrentUser(user);
            setRole(user.role);
        }

        await getProfile();

      } catch (error) {
        console.log("Token inválido o expirado durante la inicialización:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        login,
        register,
        logout,
        profileImage,
        getProfile,
        loading,
        token: getToken(),
      }}
    >
            {children}   {" "}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
