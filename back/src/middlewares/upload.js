import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: 'imagenes',
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const nameWithoutExt = path.basename(file.originalname, extension)
      .replace(/\s+/g, '-')
      .toLowerCase();
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
    const uniqueName = `${nameWithoutExt}${timestamp}${extension}`;
    cb(null, uniqueName);
  },
});

export const uploadSingleImage = multer({ storage }).single('imagen');