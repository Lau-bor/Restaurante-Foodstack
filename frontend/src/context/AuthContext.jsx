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
    }
  };
  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    setRole(null);
    setProfileImage(null);
    await fetch(`${import.meta.env.VITE_API_URL}/api/v1/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  };

  const getProfile = async () => {
    const token = getToken();

    if (!token) {
      console.log("No hay token en getProfile!");
      return;
    }

    const data = await authService.profile();
    setCurrentUser(data);
    setRole(data.role);

    if (data.profileImage) {
      setProfileImage(`http://localhost:4000${data.profileImage}`);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const token = getToken();
        if (!token) {
          setLoading(false);
          return;
        }

        const valid = await authService.verifyToken();
        console.log("token valido: ", valid);

        if (valid) {
          await getProfile();
        } else {
          logout();
        }
      } catch (error) {
        console.log("error al verificar token:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };
    if (!currentUser) {
      init();
    }
  }, [currentUser]);

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
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
