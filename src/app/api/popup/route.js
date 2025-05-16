import { connectDB } from "@/lib/connection";
import { deleteFile, uploadFile } from "@/middlewares/cloudinary";
import Popup from "@/model/popup";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const popups = await Popup.find({});
        return NextResponse.json({ data: popups, success: true });
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false });
    }
}

export async function POST(req) {
  try {
    await connectDB();
    const fields = await req.formData();
    const popup = fields.get("popup");
    const image = fields.get("image");

    if (!image || !popup) {
      return NextResponse.json({
        message: "Some fields are missing.",
        success: false,
      });
    }

    const fileBuffer = await image.arrayBuffer();
    const mimeType = image.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");

    const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

    const originalFilename = image.name;

    const cloudinaryResponse = await uploadFile(fileUri, originalFilename);

    if (!cloudinaryResponse.secure_url) {
      return NextResponse.json({
        message: "Image upload failed.",
        success: false,
      });
    }
    const newPopup = new Popup({
      popup,
      image: {
        secure_url: cloudinaryResponse.secure_url,
        public_id: cloudinaryResponse.public_id,
      },
    });

    await newPopup.save();

    return NextResponse.json({
      message: "Popup Created Successfully!",
      success: true,
      data: newPopup,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const { id, active } = await req.json();

    if (!id || active === undefined) {
      return NextResponse.json({
        message: "ID and active status are required.",
        success: false,
      });
    }

    const updatedPopup = await Popup.findOneAndUpdate(
      { id },
      { active },
      { new: true }
    );

    if (!updatedPopup) {
      return NextResponse.json({
        message: "Popup not found!",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Popup status updated successfully!",
      success: true,
      data: updatedPopup,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const fields = await req.formData();

    const id = fields.get("id");
    const popup = fields.get("popup");
    const image = fields.get("image");

    if (!id || !popup) {
      return NextResponse.json({
        message: "ID and popup name are required.",
        success: false,
      });
    }

    // Find existing popup
    const existingPopup = await Popup.findById(id);
    if (!existingPopup) {
      return NextResponse.json({
        message: "Popup not found.",
        success: false,
      });
    }

    let updatedImage = existingPopup.image;

    // If a new image is uploaded, delete the old one and upload the new one
    if (image) {
      const fileBuffer = await image.arrayBuffer();
      const mimeType = image.type;
      const encoding = "base64";
      const base64Data = Buffer.from(fileBuffer).toString("base64");
      const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
      const originalFilename = image.name;

      // Delete previous image from Cloudinary
      if (existingPopup.image?.public_id) {
        await deleteFile(existingPopup.image.public_id);
      }

      // Upload new image to Cloudinary
      const cloudinaryResponse = await uploadFile(fileUri, originalFilename);

      if (!cloudinaryResponse.secure_url) {
        return NextResponse.json({
          message: "Image upload failed.",
          success: false,
        });
      }

      updatedImage = {
        secure_url: cloudinaryResponse.secure_url,
        public_id: cloudinaryResponse.public_id,
      };
    }

    // Update popup in database
    existingPopup.popup = popup;
    existingPopup.image = updatedImage;

    await existingPopup.save();

    return NextResponse.json({
      message: "Popup updated successfully!",
      success: true,
      data: existingPopup,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}

export async function  DELETE(req) {
  try{
    await connectDB()
    const {id} = await req.json();

    if (!id) {
      return NextResponse.json({
        message: "Popup ID is required.",
        success: false,
      });
    }

    // Find existing popup
    const existingPopup = await Popup.findById(id);
    if (!existingPopup) {
      return NextResponse.json({
        message: "Popup not found.",
        success: false,
      });
    }
      // Delete image from Cloudinary
      if (existingPopup.image?.public_id) {
        await deleteFile(existingPopup.image.public_id);
      }

    await Popup.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Popup deleted successfully!",
      success: true,
    });

  }catch(err){
    return NextResponse.json({ message: err.message, success: false });
  }
}