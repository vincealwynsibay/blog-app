import { uploader } from "../config/cloudinary";
import { dataUri } from "../config/multer";

export const uploadImage = async (req: any) => {
	// parse file
	const file: any = dataUri(req).content;

	// upload image to cloudinary
	const result: any = await uploader.upload(file);
	const image: any = result.url;

	return image;
};

export const uploadImages = async (req: any) => {
	const images = [];

	for (let i = 0; i < req.length; i++) {
		const file: any = dataUri(req).content;

		const result: any = await uploader.upload(file);
		const image: any = result.url;

		images.push(image);
	}

	return images;
};
