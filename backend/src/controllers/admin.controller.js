import User from "../models/user.model.js";


export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password -__v"); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
  }
};


export const inactivateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.status(200).json({ message: "Usuario inactivado", user });
  } catch (error) {
    res.status(500).json({ message: "Error al inactivar usuario", error: error.message });
  }
};
