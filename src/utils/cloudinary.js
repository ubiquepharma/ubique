import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "db7fyrtvc",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFile = async (tempFilePath) => {
  try {
    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: `jyotishgyankendra/`,
      resource_type: "auto",
    });

    return result; // Return the result of the upload
  } catch (error) {
    console.error("Error uploading file:", error);
    return new Error("File upload failed");
  }
};

export const deleteFile = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting file:", error);
    return new Error("File deletion failed");
  }
};
