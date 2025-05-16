import { v2 as cloudinary } from "cloudinary";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFile = async (tempFilePath, originalFilename) => {
  try {
    const allowedFormats = ["jpg", "jpeg", "png", "gif", "webp"];

    const fileExtension = path
      .extname(originalFilename)
      .toLowerCase()
      .replace(".", "");
    if (!allowedFormats.includes(fileExtension)) {
      throw new Error("Invalid file type. Only images are allowed.");
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: "ubiquepharma/",
      resource_type: "image",
    });

    return result;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("File upload failed");
  }
};

export const deleteFile = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("File deletion failed");
  }
};
