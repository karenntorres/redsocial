import multer from 'multer';
import path from 'path';

// Configure disk storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images/'); // folder where images will be stored
	},
	filename: (req, file, cb) => {
		const extension = path.extname(file.originalname);
		const nameWithoutExt = path
			.basename(file.originalname, extension)
			.replace(/\s+/g, '-')
			.toLowerCase();
		const timestamp = Date.now();
		const uniqueName = `${nameWithoutExt}-${timestamp}${extension}`;
		cb(null, uniqueName);
	},
});

// Multer instance, expecting field "pfPicture"
const upload = multer({ storage });

export default upload;
