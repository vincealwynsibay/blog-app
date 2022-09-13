import multer from "multer";
import DatauriParser from "datauri/parser";
import path from "path";

// store file in memory as buffer
const storage = multer.memoryStorage();

const parser = new DatauriParser();
// configure multer with the storage as memory storage
export const multerUpload = multer({ storage });

// parses file
export const dataUri = (file: any) => {
	return parser.format(
		path.extname(file.originalname).toString(),
		file.buffer
	);
};
