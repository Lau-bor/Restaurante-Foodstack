import multer from 'multer';

const storageMenuImages = multer.memoryStorage();

const configUploadMenuImages = multer({
  storage: storageMenuImages,
  limits: {
    files: 5,
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const imageTypes = /jpeg|jpg|png|webp|gif/;
    const extname = imageTypes.test(file.originalname.toLowerCase());
    const mimetype = imageTypes.test(file.mimetype);

    if (extname && mimetype) cb(null, true);
    else {
      req.fileValidationError =
        "Solo se permiten imágenes: jpeg, jpg, png, webp, gif";
      cb(null, false);
    }
  },
});


export default (req, res, next) => {
  configUploadMenuImages.array("files")(req, res, (error) => {
    if (error) {
      if (error.code === "LIMIT_FILE_SIZE") {
        req.fileValidationError = "Cada imagen debe ser menor a 2MB";
      } else if (error.code === "LIMIT_FILE_COUNT") {
        req.fileValidationError = "No se pueden subir más de 5 imágenes";
      } else {
        req.fileValidationError = `Error al subir archivo: ${error.message}`;
      }
    }
    next();
  });
};