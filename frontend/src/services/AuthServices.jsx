const API = "http://localhost:4000/api/v1";
const getToken = () => localStorage.getItem("token");
import axios from "axios";

export const register = async (userData) => {
    const res = await axios.post(`${API}/register`, userData)
    return res.data
};

export const login = async (data) => {
    const res = await fetch(`${API}/login`, {
        method:"POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(data),
    })

    if(!res.ok) throw new Error("Login Fallido :(");

    const json = await res.json();

    //aca vamos a devolver el token y el usuario
    return {
        token: json.token,
        user:{
            id: json.id,
            username: json.username,
            email: json.email,
            profileImage: json.profileImage,
        },
    };
};

export const verifyToken = async () => {
    const res = await fetch(`${API}/verify-token`, {
        headers:{
            Authorization: `Bearer ${getToken()}`,
        },
    });

    return res.ok;
};

export const profile = async () => {
    const res = await fetch(`${API}/profile`, {
        headers:{
            Authorization: `Bearer ${getToken()}`
        },
    }) ;
    if(!res.ok) throw new Error("Token Inválido");
    return await res.json()
};