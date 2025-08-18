import fs from 'fs';
import path from 'path';
import Menu from '../models/menu.model.js';

// Helper function to safely delete files
const unlinkFiles = (files) => {
    if (files && files.length > 0) {
        files.forEach(file => {
            const filePath = path.join('public', 'uploads', 'menu', file.filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });
    }
};

// CREATE
export const createMenu = async (req, res) => {
    try {
        if (req.fileValidationError) {
            unlinkFiles(req.files);
            return res.status(400).json({ message: req.fileValidationError });
        }

        const { title, description, deliveryTime, price } = req.body;
        
        // This handles cases where 'files' might be empty or missing
        const savedFiles = req.files?.map(file => ({
            name: file.originalname,
            path: `/uploads/menu/${file.filename}`,
            size: file.size,
            mimetype: file.mimetype
        })) || [];

        const newMenu = new Menu({
            title,
            description,
<<<<<<< HEAD
            price: Number(price),
=======
            price,
>>>>>>> origin/adminpage
            deliveryTime: deliveryTime || new Date(),
            user: req.user.id,
            files: savedFiles
        });

        const savedMenu = await newMenu.save();
        return res.status(201).json(savedMenu);

    } catch (error) {
        unlinkFiles(req.files); // Delete files on any error
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};

<<<<<<< HEAD
// READ - GET ALL MENUS (with filters)
=======

>>>>>>> origin/adminpage
export const getMenus = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};
        if (req.query.title) filter.title = { $regex: req.query.title, $options: 'i' };
        if (req.query.category) filter.category = req.query.category;
        if (req.query.minPrice) filter.price = { ...filter.price, $gte: Number(req.query.minPrice) };
        if (req.query.maxPrice) filter.price = { ...filter.price, $lte: Number(req.query.maxPrice) };

        const totalMenus = await Menu.countDocuments(filter);
        const menus = await Menu.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("user", "username email");
<<<<<<< HEAD

        const menusWithUrls = menus.map(menu => {
            const filesWithUrl = menu.files.map(file => ({
                ...file._doc,
                // Assumes your server serves static files from the 'public' folder
                url: `${req.protocol}://${req.get('host')}${file.path}`
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

// READ - GET SINGLE MENU BY ID
export const getMenuById = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        if (!menu) {
            return res.status(404).json({ message: 'Menú no encontrado' });
        }
        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar el menú', error });
    }
};

// UPDATE
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
=======

        const menusWithUrls = menus.map(menu => {
            const filesWithUrl = menu.files.map(file => ({
                ...file._doc,
                url: file.path.startsWith("/") ? file.path : `/uploads/${file.path}`
            }));

            return { ...menu._doc, files: filesWithUrl };
        });

        return res.status(200).json({
            total: totalMenus,
            page,
            totalPages: Math.ceil(totalMenus / limit),
            data: menusWithUrls
        });
>>>>>>> origin/adminpage
    } catch (error) {
        console.error("Error al obtener menús:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

<<<<<<< HEAD
// DELETE
=======

export const getMenuById = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        if (!menu) return res.status(404).json({ message: 'Menú no encontrado' });
        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar el menú', error });
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
      const idsToDelete = Array.isArray(req.body.filesToDelete) ? req.body.filesToDelete : [req.body.filesToDelete];

      existingMenu.files = existingMenu.files.filter(file => {
        if (idsToDelete.includes(file._id.toString())) {
          const filePath = path.join('public', file.path);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
          return false;
        }
        return true;
      });
    }

    
    if (req.files && req.files.length > 0) {
      const newFiles = req.files.map(file => ({
        name: file.originalname,
        path: `/uploads/menu/${file.filename}`,
        size: file.size,
        mimetype: file.mimetype
      }));
      existingMenu.files = [...existingMenu.files, ...newFiles];
    }

   
    existingMenu.title = req.body.title || existingMenu.title;
    existingMenu.description = req.body.description || existingMenu.description;
    existingMenu.price = req.body.price || existingMenu.price;
    existingMenu.deliveryTime = req.body.deliveryTime || existingMenu.deliveryTime;

    const updatedMenu = await existingMenu.save();
    return res.status(200).json(updatedMenu);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};




>>>>>>> origin/adminpage
export const deleteMenu = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Acceso denegado: solo administradores" });
    }
    try {
        const menu = await Menu.findByIdAndDelete(req.params.id);
<<<<<<< HEAD
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
=======
        if (!menu) return res.status(404).json({ message: "Menu not found" });

        
        if (menu.files?.length > 0) {
            menu.files.forEach(file => {
                const filePath = path.join('public', file.path);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            });
        }

>>>>>>> origin/adminpage
        return res.status(200).json({ message: "Menu deleted!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};