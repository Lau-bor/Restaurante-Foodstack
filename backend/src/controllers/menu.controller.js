import Menu from "../models/menu.model.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createMenu = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Acceso denegado: solo administradores" });
  }

  if (req.fileValidationError) {
    return res.status(400).json({ message: req.fileValidationError });
  }

  try {
    let files = [];

    
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "menus" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(file.buffer);
        });

        files.push({
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        });
      }
    }

    
    const newMenu = new Menu({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      deliveryTime: req.body.deliveryTime,
      files,
    });

    const savedMenu = await newMenu.save();
    return res.status(201).json(savedMenu);

  } catch (error) {
    console.error("Error en createMenu:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getMenus = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.title)
      filter.title = { $regex: req.query.title, $options: "i" };
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
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Acceso denegado: solo administradores" });
  }

  if (req.fileValidationError) {
    return res.status(400).json({ message: req.fileValidationError });
  }

  try {
    const existingMenu = await Menu.findById(req.params.id);
    if (!existingMenu) {
      return res.status(404).json({ message: "Menú no encontrado" });
    }

   
    if (req.body.filesToDelete && req.body.filesToDelete.length > 0) {
      const idsToDelete = Array.isArray(req.body.filesToDelete)
        ? req.body.filesToDelete
        : [req.body.filesToDelete];

     
      for (const fileId of idsToDelete) {
        const fileToDelete = existingMenu.files.find(f => f._id.toString() === fileId);
        if (fileToDelete) {
          await cloudinary.uploader.destroy(fileToDelete.public_id);
        }
      }

      
      existingMenu.files = existingMenu.files.filter(
        file => !idsToDelete.includes(file._id.toString())
      );
    }

    
    if (req.files && req.files.length > 0) {
      const newFiles = [];
      for (const file of req.files) {
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "menus" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(file.buffer);
        });

        newFiles.push({
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url
        });
      }
      existingMenu.files = [...existingMenu.files, ...newFiles];
    }

    
    existingMenu.title = req.body.title || existingMenu.title;
    existingMenu.description = req.body.description || existingMenu.description;
    existingMenu.price = req.body.price || existingMenu.price;
    existingMenu.deliveryTime = req.body.deliveryTime || existingMenu.deliveryTime;

    const updatedMenu = await existingMenu.save();
    return res.status(200).json(updatedMenu);

  } catch (error) {
    console.error("Error en updateMenu:", error);
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
