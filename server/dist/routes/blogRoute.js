"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = require("../config/multer");
const ExpressError_1 = __importDefault(require("../lib/ExpressError"));
const ImageUpload_1 = require("../lib/ImageUpload");
const Blog_1 = __importDefault(require("../models/Blog"));
const router = express_1.default.Router();
router.get("/", async (_req, res, next) => {
    try {
        const blogs = await Blog_1.default.find();
        return res.json({ blogs });
    }
    catch (err) {
        next(err);
    }
});
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const blog = await Blog_1.default.findById(id);
        if (!blog) {
            throw new ExpressError_1.default("Blog not found", 404);
        }
        return res.json({ blog });
    }
    catch (err) {
        next(err);
    }
});
router.post("/", multer_1.multerUpload.single("image"), async (req, res, next) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            throw new ExpressError_1.default("Title and Content not provided");
        }
        console.log("body:", req.body);
        console.log("file:", req.file);
        const image = await (0, ImageUpload_1.uploadImage)(req);
        let blog = new Blog_1.default({
            title,
            content,
            image,
        });
        blog = await blog.save();
        return res.json({ blog });
    }
    catch (err) {
        next(err);
    }
});
router.put("/:id", async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const { id } = req.params;
        if (!title || !content) {
            throw new ExpressError_1.default("Title and Content not provided");
        }
        const blog = await Blog_1.default.findById(id);
        if (!blog) {
            throw new ExpressError_1.default("Blog not found", 404);
        }
        blog.title = title;
        blog.content = content;
        await blog.save();
        return res.json({ blog });
    }
    catch (err) {
        next(err);
    }
});
router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        let blog = await Blog_1.default.findByIdAndDelete(id);
        if (!blog) {
            throw new ExpressError_1.default("Blog not found", 404);
        }
        await Blog_1.default.deleteOne({ _id: id });
        return res.json({ ok: true });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
//# sourceMappingURL=blogRoute.js.map