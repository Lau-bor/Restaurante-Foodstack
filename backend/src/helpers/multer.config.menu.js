
import multer from "multer";

const storage = multer.memoryStorage();

const uploadMenuImages = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, 
    files: 5
  },
  fileFilter: (req, file, cb) => {
    const imageTypes = /jpeg|jpg|png|webp|gif/;
    const extname = imageTypes.test(file.originalname.toLowerCase());
    const mimetype = imageTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      req.fileValidationError = "Solo se permiten imágenes: jpeg, jpg, png, webp, gif";
      cb(null, false);
    }
  }
}).array("files"); 

export default uploadMenuImages;
