import { v2 as cloudinary } from "cloudinary";

// configure cloudinary
const configureCloudinary = () => {
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_NAME,
		api_key: process.env.CLOUDINARY_KEY,
		api_secret: process.env.CLOUDINARY_SECRET,
		secure: true,
	});
};

// export cloudinary uploader
const { uploader } = cloudinary;

export { configureCloudinary, uploader };
