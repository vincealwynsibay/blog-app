"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const cloudinary_1 = require("../config/cloudinary");
const multer_1 = require("../config/multer");
const uploadImage = async (req) => {
    const file = (0, multer_1.dataUri)(req).content;
    const result = await cloudinary_1.uploader.upload(file);
    const image = result.url;
    return image;
};
exports.uploadImage = uploadImage;
//# sourceMappingURL=ImageUpload.js.map