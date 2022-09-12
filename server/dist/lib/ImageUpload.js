"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImages = exports.uploadImage = void 0;
const cloudinary_1 = require("../config/cloudinary");
const multer_1 = require("../config/multer");
const uploadImage = async (req) => {
    const file = (0, multer_1.dataUri)(req).content;
    const result = await cloudinary_1.uploader.upload(file);
    const image = result.url;
    return image;
};
exports.uploadImage = uploadImage;
const uploadImages = async (req) => {
    const images = [];
    for (let i = 0; i < req.length; i++) {
        const file = (0, multer_1.dataUri)(req).content;
        const result = await cloudinary_1.uploader.upload(file);
        const image = result.url;
        images.push(image);
    }
    return images;
};
exports.uploadImages = uploadImages;
//# sourceMappingURL=ImageUpload.js.map