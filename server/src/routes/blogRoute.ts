import express, { NextFunction, Request, Response } from "express";
import { multerUpload } from "../config/multer";
import ExpressError from "../lib/ExpressError";
import { uploadImage, uploadImages } from "../lib/ImageUpload";
import Blog from "../models/Blog";
const router = express.Router();

// get all blogs w/ pagination using limit and skip query
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const blogs = await Blog.find();

		return res.json({ blogs });
	} catch (err) {
		next(err);
	}
});
// get blog by id
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;

		const blog = await Blog.findById(id);

		if (!blog) {
			throw new ExpressError("Blog not found", 404);
		}

		return res.json({ blog });
	} catch (err) {
		next(err);
	}
});
// post blog
router.post(
	"/",
	multerUpload.single("image"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { title, content } = req.body;

			if (!title || !content) {
				throw new ExpressError("Title and Content not provided");
			}

			console.log("body:", req.body);
			console.log("file:", req.file);

			// upload images
			const image = await uploadImage(req);

			let blog = new Blog({
				title,
				content,
				image,
			});

			blog = await blog.save();

			return res.json({ blog });
		} catch (err) {
			next(err);
		}
	}
);

// edit blog
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { title, content } = req.body;
		const { id } = req.params;

		if (!title || !content) {
			throw new ExpressError("Title and Content not provided");
		}

		const blog = await Blog.findById(id);

		if (!blog) {
			throw new ExpressError("Blog not found", 404);
		}

		blog.title = title;
		blog.content = content;

		await blog.save();

		return res.json({ blog });
	} catch (err) {
		next(err);
	}
});
// delete blog
router.delete(
	"/:id",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			let blog = await Blog.findByIdAndDelete(id);

			if (!blog) {
				throw new ExpressError("Blog not found", 404);
			}

			await Blog.deleteOne({ _id: id });

			return res.json({ ok: true });
		} catch (err) {
			next(err);
		}
	}
);
export default router;
