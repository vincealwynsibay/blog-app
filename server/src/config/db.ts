import { __prod__ } from "./../constants";
import mongoose from "mongoose";

export default function connectDB() {
	try {
		const uri = __prod__
			? process.env.MONGO_URI_PROD
			: process.env.MONGO_URI_DEV;
		mongoose.connect(uri!).then(() => {
			console.log(`[server] Database connected`);
		});
	} catch (err) {
		console.error(err);
	}
}
