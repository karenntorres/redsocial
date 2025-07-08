import multer from 'multer'; // to upload images
import path from 'path'; // to manipulate and manage files and folders

const storage = multer.diskStorage({
    destination: 'images',
    filename:
    (req, file, cb)=>{
            cb(null, file.originalname);
    },
});

export const imagesStorage = multer({storage}).single('pfPicture');