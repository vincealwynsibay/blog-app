"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = exports.configureCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const configureCloudinary = () => {
    cloudinary_1.v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
        secure: true,
    });
};
exports.configureCloudinary = configureCloudinary;
const { uploader } = cloudinary_1.v2;
exports.uploader = uploader;
//# sourceMappingURL=cloudinary.js.map