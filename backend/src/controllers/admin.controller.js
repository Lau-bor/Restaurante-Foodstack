import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password -__v");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
  }
};

export const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    
    if (user.role === 'admin') {
      return res.status(403).json({ 
        message: "No se pueden modificar usuarios administradores" 
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      message: `Usuario ${user.isActive ? "activado" : "inactivado"}`,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al cambiar estado de usuario", error: error.message });
  }
};

export const activateUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    
    if (user.role === 'admin') {
      return res.status(403).json({ 
        message: "No se pueden modificar usuarios administradores" 
      });
    }

    user.isActive = true;
    await user.save();

    res.status(200).json({ message: "Usuario activado", user });
  } catch (error) {
    res.status(500).json({ message: "Error al activar usuario", error: error.message });
  }
};