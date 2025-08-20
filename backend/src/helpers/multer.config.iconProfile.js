import multer from "multer";
import path from 'path';


const storageProfileImage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, 'public/uploads/profile')
    },
    filename: function(req, file, callback){
        callback(null, `${Date.now()}_icon_${path.extname(file.originalname)}`) 
    }
})



const uploadIconProfileImage = multer({
    storage: storageProfileImage,
    limits: {
        fileSize: 2 * 1024 * 1024 
    },
    fileFilter: (req, file, cb) => {
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)){
            req.fileValidationError = "Solo se permiten imágenes";
            return cb(null, false, req.fileValidationError)
        }
        cb(null, true)
    }
})

export default uploadIconProfileImage;