import express, { NextFunction, Request, Response } from "express";
import ExpressError from "../lib/ExpressError";
import Blog from "../models/Blog";
const router = express.Router();

// get all blogs w/ pagination using limit and skip query
// get blog by id
router.get(
	"/blogs/:id",
	async (req: Request, res: Response, next: NextFunction) => {
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
	}
);
// post blog
router.post(
	"/blogs",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { title, content } = req.body;
			if (!title || !content) {
				throw new ExpressError("Title and Content not provided");
			}

			let blog = new Blog({
				title,
				content,
			});

			blog = await blog.save();

			return res.json({ blog });
		} catch (err) {
			next(err);
		}
	}
);

// edit blog
router.put(
	"/blogs/:id",
	async (req: Request, res: Response, next: NextFunction) => {
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
	}
);
// delete blog
router.delete(
	"/blogs/:id",
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
