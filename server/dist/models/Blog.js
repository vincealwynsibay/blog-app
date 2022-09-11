"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    author: {
        type: mongoose_1.Types.ObjectId,
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
const Blog = (0, mongoose_1.model)("Blog", blogSchema);
exports.default = Blog;
//# sourceMappingURL=Blog.js.map