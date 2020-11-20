import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const version2 = cloudinary.v2;

version2.config({
  cloud_name: process.env.DEV_CLOUD_NAME,
  api_key: process.env.DEV_CLOUDINARY_API_KEY,
  api_secret: process.env.DEV_CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: version2
  //   params: {
  //     folder: "samples"
  //   }
});

export const parser = multer({ storage });
