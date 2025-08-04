// src/middlewares/role.middleware.js
export function checkRole(requiredRole) {
  return (req, res, next) => {
    console.log("Usuario decodificado:", req.user); 
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: "No autorizado" });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: "Acceso denegado: no sos " + requiredRole });
    }

    next();
  };
}
