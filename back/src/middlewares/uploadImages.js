import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images/');
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

const upload = multer({ storage });

export default upload;
