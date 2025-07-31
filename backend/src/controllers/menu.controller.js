import fs from 'fs';
import path from 'path';
import Menu from '../models/menu.model.js';

export const createMenu = async (req, res) => {
    if (req.fileValidationError) {
        if (req.files?.length > 0) {
            req.files.forEach(file => {
                const filePath = path.join('public', 'uploads', 'menu', file.filename);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            });
        }
        return res.status(400).json({ message: req.fileValidationError });
    }

    try {
        const { title, description, deliveryTime } = req.body;

        let savedFiles = [];

        if (req.files && req.files.length > 0) {
            savedFiles = req.files.map(file => ({
                name: file.originalname,
                path: `/uploads/menu/${file.filename}`,
                size: file.size,
                mimetype: file.mimetype
            }));
        }

        const newMenu = new Menu({
        title,
        description,
        deliveryTime: deliveryTime || new Date(),
        user: req.user.id,
        files: savedFiles
        });

        const savedMenu = await newMenu.save();
        return res.status(201).json(savedMenu);

    } catch (error) {
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                const filePath = path.join('public', 'uploads', 'menu', file.filename);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });
        }

        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};

export const getMenus = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};


    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: 'i' }; 
    }

    const totalMenus = await Menu.countDocuments(filter);
    const menus = await Menu.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username email");

    const menusWithUrls = menus.map(menu => {
      const filesWithUrl = menu.files.map(file => ({
        ...file._doc,
        url: `/uploads/${file.path.replace('public/uploads/', '')}`
      }));

      return {
        ...menu._doc,
        files: filesWithUrl
      };
    });

    return res.status(200).json({
      total: totalMenus,
      page,
      totalPages: Math.ceil(totalMenus / limit),
      data: menusWithUrls
    });
  } catch (error) {
    console.error("Error al obtener menús:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};


export const getMenu = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Acceso denegado: solo administradores" });
    }

    try {
        const menu = await Menu.findById(req.params.id).populate("user");

        if (!menu) {
            return res.status(404).json({ message: "Menú no encontrado" });
        }

        return res.status(200).json(menu);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
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

        
        const shouldReplaceImages = req.body.replaceImages === 'true';

        
        let newFiles = [];
        if (req.files && req.files.length > 0) {
            newFiles = req.files.map(file => ({
                name: file.originalname,
                path: `/uploads/menu/${file.filename}`,
                size: file.size,
                mimetype: file.mimetype
            }));

            
            if (shouldReplaceImages && existingMenu.files?.length > 0) {
                existingMenu.files.forEach(file => {
                    const filePath = path.join('public', file.path);
                    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
                });
            }
        }

        const updateData = {
            ...req.body,
            files: shouldReplaceImages ? newFiles : [...(existingMenu.files || []), ...newFiles]
        };

        const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, updateData, { new: true });
        return res.status(200).json(updatedMenu);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};


export const deleteMenu = async (req, res) => {
    
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Acceso denegado: solo administradores" });
    }

    try {
        const menu = await Menu.findByIdAndDelete(req.params.id);

        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }

        if (menu.files && menu.files.length > 0) {
        menu.files.forEach(file => {
        const filePath = path.join('public', file.path);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
      });
    }

        return res.status(200).json({ message: "Menu deleted!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};
