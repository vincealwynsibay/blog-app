"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ExpressError_1 = __importDefault(require("../lib/ExpressError"));
const Blog_1 = __importDefault(require("../models/Blog"));
const router = express_1.default.Router();
router.get("/blogs/:id", async (req, res, next) => {
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
router.post("/blogs", async (req, res, next) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            throw new ExpressError_1.default("Title and Content not provided");
        }
        let blog = new Blog_1.default({
            title,
            content,
        });
        blog = await blog.save();
        return res.json({ blog });
    }
    catch (err) {
        next(err);
    }
});
router.put("/blogs/:id", async (req, res, next) => {
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
router.delete("/blogs/:id", async (req, res, next) => {
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