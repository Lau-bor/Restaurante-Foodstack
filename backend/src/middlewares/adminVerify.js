export const verificarAdmin = (req, res, next) => {
    const user = req.user;
    console.log("Usuario en middleware:", user);
    if (user.role !== 'admin') {
        return res.status(403).json({ mensaje: "Acceso denegado, se requiere rol de administrador" });
    }
    next();
};
