import { connectDB } from "@/lib/connection";
import { deleteFile, uploadFile } from "@/middlewares/cloudinary";
import Slider from "@/model/slider";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const sliders = await Slider.find({});
    return NextResponse.json({ data: sliders, success: true });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const fields = await req.formData();
    const slider = fields.get("slider");
    const image = fields.get("image");

    if (!image || !slider) {
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
    const newSlider = new Slider({
      slider,
      image: {
        secure_url: cloudinaryResponse.secure_url,
        public_id: cloudinaryResponse.public_id,
      },
    });

    await newSlider.save();

    return NextResponse.json({
      message: "Slider Created Successfully!",
      success: true,
      data: newSlider,
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
    const slider = fields.get("slider");
    const image = fields.get("image");

    if (!id || !slider) {
      return NextResponse.json({
        message: "ID and slider name are required.",
        success: false,
      });
    }

    // Find existing slider
    const existingSlider = await Slider.findById(id);
    if (!existingSlider) {
      return NextResponse.json({
        message: "Slider not found.",
        success: false,
      });
    }

    let updatedImage = existingSlider.image;

    // If a new image is uploaded, delete the old one and upload the new one
    if (image) {
      const fileBuffer = await image.arrayBuffer();
      const mimeType = image.type;
      const encoding = "base64";
      const base64Data = Buffer.from(fileBuffer).toString("base64");
      const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
      const originalFilename = image.name;

      // Delete previous image from Cloudinary
      if (existingSlider.image?.public_id) {
        await deleteFile(existingSlider.image.public_id);
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

    // Update slider in database
    existingSlider.slider = slider;
    existingSlider.image = updatedImage;

    await existingSlider.save();

    return NextResponse.json({
      message: "Slider updated successfully!",
      success: true,
      data: existingSlider,
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
        message: "Slider ID is required.",
        success: false,
      });
    }

    // Find existing slider
    const existingSlider = await Slider.findById(id);
    if (!existingSlider) {
      return NextResponse.json({
        message: "Slider not found.",
        success: false,
      });
    }
      // Delete image from Cloudinary
      if (existingSlider.image?.public_id) {
        await deleteFile(existingSlider.image.public_id);
      }

    await Slider.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Slider deleted successfully!",
      success: true,
    });

  }catch(err){
    return NextResponse.json({ message: err.message, success: false });
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

    const updatedSlider = await Slider.findOneAndUpdate(
      { id },
      { active },
      { new: true }
    );

    if (!updatedSlider) {
      return NextResponse.json({
        message: "Slider not found!",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Slider status updated successfully!",
      success: true,
      data: updatedSlider,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}