import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
    // Lee el token de las cabeceras o de las cookies
    let token = null;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }

    if (!token && req.cookies?.token) {
        token = req.cookies.token;
    }

    // Si no hay token en ningún lado, rechazamos la solicitud
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    // Verificar el token usando un bloque try...catch
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};