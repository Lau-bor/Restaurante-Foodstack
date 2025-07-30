import multer from 'multer';
import path from 'path';
import fs from 'fs';

const UPLOAD_DIR = 'public/uploads/menu';
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storageMenuImages = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, UPLOAD_DIR);
    },
    filename: function (req, file, callback) {
        const ext = path.extname(file.originalname).toLowerCase();
        callback(null, `${Date.now()}_menu${ext}`);
    }
});

const configUploadMenuImages = multer({
    storage: storageMenuImages,
    limits: {
        files: 5,
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (!req.body.title || req.body.title.trim() === "") {
            req.fileValidationError = 'Es obligatorio que mandes un título';
            return cb(null, false);
        }

        const imageTypes = /jpeg|jpg|png|webp|gif/;
        const extname = imageTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = imageTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            req.fileValidationError = 'Solo se permiten imágenes: jpeg, jpg, png, webp, gif';
            return cb(null, false);
        }
    }
});

const uploadMenuImages = (req, res, next) => {
    const upload = configUploadMenuImages.array("files");

    upload(req, res, function (error) {
        if (error) {
            if (error.code === 'LIMIT_FILE_SIZE') {
                req.fileValidationError = "Cada imagen debe ser menor a 2MB";
            } else if (error.code === 'LIMIT_FILE_COUNT') {
                req.fileValidationError = "No se pueden subir más de 5 imágenes";
            } else if (error.code === 'LIMIT_UNEXPECTED_FILE') {
                req.fileValidationError = "Archivo no permitido.";
            } else {
                console.log(error);
                req.fileValidationError = `Error al subir el archivo - ${error}`;
            }
        }
        next();
    });
};

export default uploadMenuImages;
