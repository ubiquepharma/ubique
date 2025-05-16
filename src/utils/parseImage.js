export default async function parseImage(image) {
  try {
    // Check if the image is already a buffer or a valid file object
    if (!image || !image.buffer) {
      throw new Error("Invalid image data.");
    }

    const fileBuffer = image.buffer; // Directly access the buffer if image is a file
    const mimeType = image.mimetype; // Get mime type (image/png, image/jpeg, etc.)
    const encoding = "base64"; // The encoding used for conversion
    const base64Data = fileBuffer.toString("base64"); // Convert buffer to base64

    const fileUri = `data:${mimeType};${encoding},${base64Data}`;

    return fileUri;
  } catch (error) {
    console.error("Error in parsing image:", error.message);
    throw new Error("Error parsing image: " + error.message);
  }
}
