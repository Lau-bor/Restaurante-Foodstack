export const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // es admin → puede continuar
  } else {
    return res.status(403).json({ message: 'Acceso denegado: solo para administradores' });
  }
};
