import Menu from "../models/menu.model.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "menus",
  });
  fs.unlinkSync(filePath);
  return { url: result.secure_url, public_id: result.public_id };
};

export const createMenu = async (req, res) => {
  try {
    if (req.fileValidationError) {
      return res.status(400).json({ message: req.fileValidationError });
    }

    const { title, description, price, deliveryTime } = req.body;

    const files = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "menus" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });

        files.push({
          name: file.originalname,
          size: file.size,
          mimetype: file.mimetype,
          contentType: file.mimetype,
          url: uploadResult.secure_url,
          public_id: uploadResult.public_id,
        });
      }
    }

    const newMenu = new Menu({
      title,
      description,
      price,
      deliveryTime: deliveryTime || new Date(),
      user: req.user?.id,
      files,
    });

    const savedMenu = await newMenu.save();
    res.status(201).json(savedMenu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
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
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menú no encontrado" });

    if (req.fileValidationError)
      return res.status(400).json({ message: req.fileValidationError });

    if (req.body.filesToDelete && req.body.filesToDelete.length > 0) {
      const idsToDelete = Array.isArray(req.body.filesToDelete)
        ? req.body.filesToDelete
        : [req.body.filesToDelete];
      for (const id of idsToDelete) {
        const fileToDelete = menu.files.find((f) => f.public_id === id);
        if (fileToDelete) {
          await cloudinary.uploader.destroy(fileToDelete.public_id);
        }
      }
      menu.files = menu.files.filter((f) => !idsToDelete.includes(f.public_id));
    }

    
    let existingFiles = [];
    if (req.body.existingFiles) {
      if (Array.isArray(req.body.existingFiles)) {
        existingFiles = req.body.existingFiles.map((f) => JSON.parse(f));
      } else {
        existingFiles = [JSON.parse(req.body.existingFiles)];
      }
    }

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "menus" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });

        if (uploadResult && uploadResult.public_id && uploadResult.secure_url) {
          menu.files.push({
            name: file.originalname,
            size: file.size,
            mimetype: file.mimetype,
            contentType: file.mimetype,
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
          });
        } else {
          console.error(
            "⚠️ Error: uploadResult no devolvió public_id o secure_url",
            uploadResult
          );
        }
      }
    }

    menu.title = req.body.title || menu.title;
    menu.description = req.body.description || menu.description;
    menu.price = req.body.price || menu.price;
    menu.deliveryTime = req.body.deliveryTime || menu.deliveryTime;

    menu.files = menu.files.filter(
      (f) => f && typeof f === "object" && f.public_id && f.url
    );

    
    menu.files = [...existingFiles, ...menu.files];

    console.log("Archivos antes de guardar:", menu.files);

    const updatedMenu = await menu.save();
    res.status(200).json(updatedMenu);
  } catch (error) {
    console.error("Error actualizando menú:", error);
    res.status(500).json({ message: error.message });
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
