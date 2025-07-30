export const verificarAdmin = (req, res, next) => {
    const user = req.usuario;
    if (user.role !== 'admin') {
        return res.status(403).json({ mensaje: "Acceso denegado, se requiere rol de administrador" });
    }
    next();
};