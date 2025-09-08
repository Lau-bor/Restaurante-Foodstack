import Menu from "../models/menu.model.js";
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const createMenu = async (req, res) => {
  try {
    const { title, description, price, deliveryTime } = req.body;

    let savedFiles = [];
    if (req.files && req.files.length > 0) {
      savedFiles = await Promise.all(
        req.files.map(async (file) => {
          const uploadResult = await cloudinary.uploader.upload(file.path, {
            folder: "menus",
          });
          return {
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
          };
        })
      );
    }

    const newMenu = new Menu({
      title,
      description,
      price,
      deliveryTime,
      user: req.user.id,
      files: savedFiles,
    });

    const savedMenu = await newMenu.save();
    return res.status(201).json(savedMenu);
  } catch (error) {
    console.error("Error al crear menú:", error);
    return res.status(500).json({ message: error.message });
  }
};


export const getMenus = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.title) filter.title = { $regex: req.query.title, $options: "i" };
    if (req.query.category) filter.category = req.query.category;

    const totalMenus = await Menu.countDocuments(filter);
    const menus = await Menu.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username email");

    return res.status(200).json({
      total: totalMenus,
      page,
      totalPages: Math.ceil(totalMenus / limit),
      data: menus,
    });
  } catch (error) {
    console.error("Error al obtener menús:", error);
    return res.status(500).json({ message: error.message });
  }
};


export const getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menú no encontrado" });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar el menú", error });
  }
};


export const updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menú no encontrado" });

    
    if (req.body.filesToDelete && req.body.filesToDelete.length > 0) {
      const idsToDelete = Array.isArray(req.body.filesToDelete)
        ? req.body.filesToDelete
        : [req.body.filesToDelete];

      for (const fileId of idsToDelete) {
        const file = menu.files.find((f) => f._id.toString() === fileId);
        if (file) {
          await cloudinary.uploader.destroy(file.public_id);
        }
      }

      menu.files = menu.files.filter(
        (file) => !idsToDelete.includes(file._id.toString())
      );
    }

    
    if (req.files && req.files.length > 0) {
      const newFiles = await Promise.all(
        req.files.map(async (file) => {
          const uploadResult = await cloudinary.uploader.upload(file.path, {
            folder: "menus",
          });
          return {
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
          };
        })
      );
      menu.files = [...menu.files, ...newFiles];
    }

    
    menu.title = req.body.title || menu.title;
    menu.description = req.body.description || menu.description;
    menu.price = req.body.price || menu.price;
    menu.deliveryTime = req.body.deliveryTime || menu.deliveryTime;

    const updatedMenu = await menu.save();
    return res.status(200).json(updatedMenu);
  } catch (error) {
    console.error("Error al actualizar menú:", error);
    return res.status(500).json({ message: error.message });
  }
};


export const deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menú no encontrado" });

    
    if (menu.files && menu.files.length > 0) {
      for (const file of menu.files) {
        await cloudinary.uploader.destroy(file.public_id);
      }
    }

    return res.status(200).json({ message: "Menú eliminado!" });
  } catch (error) {
    console.error("Error al eliminar menú:", error);
    return res.status(500).json({ message: error.message });
  }
};
