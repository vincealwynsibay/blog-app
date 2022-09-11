import { Schema, model, Types } from "mongoose";

const blogSchema = new Schema({
	author: {
		type: Types.ObjectId,
		ref: "User",
	},
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	images: [
		{
			type: String,
		},
	],
});

const Blog = model("Blog", blogSchema);
export default Blog;
