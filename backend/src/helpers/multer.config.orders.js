import multer from 'multer';
import path from 'path';

const storageOrderFiles = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, "public/uploads/tasks")
    },
    filename: function(req, file, callback){
        callback(null, `${Date.now()}_tasks_${path.extname(file.originalname)}`);
    }
});


const configUploadOrderFiles = multer({
    storage: storageOrderFiles,
    limits: {
        files: 5,
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        
        if(!req.body.title || req.body.title.trim() === ""){
            req.fileValidationError = 'Es obligatorio que mandes un título'
            return cb(null, false)
        }

      
        const filetypes = /jpeg|jpg|png|gif|webp|pdf|doc|docx|zip|xlsx/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if(extname && mimetype){
            return cb(null, true)
        } else {
            req.fileValidationError = 'Solo se permiten archivos jpeg|jpg|png|gif|webp|pdf|doc|docx|zip';
            return cb(null, false)
        }
    }
})

const uploadsOrderFiles = (req, res, next) => {
    const upload = configUploadOrderFiles.array("files");

    upload (req, res, function(error){
        if(error){
            if(error.code === 'LIMIT_FILE_SIZE'){
                req.fileValidationError = "Cada archivo debe ser menor a 2mb"
            } else if (error.code === 'LIMIT_FILE_COUNT'){
                req.fileValidationError = "No más de 5 archivos permitidos"
            } else if (error.code === 'LIMIT_UNEXPECTED_FILE'){
                req.fileValidationError = "Tipo de archivo incorrecto."
            } else {
                console.log(error);
                req.fileValidationError = `Error al subir el archivo - ${error}`
            }
        }

        next();
    })
};

export default uploadsOrderFiles;