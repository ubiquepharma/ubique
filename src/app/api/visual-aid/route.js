import { connectDB } from "@/lib/connection";
import { deleteFile, uploadFile } from "@/middlewares/cloudinary";
import VisualAid from "@/model/visualAid";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit")) || 10;
    const page = parseInt(searchParams.get("page")) || 1;

    const totalvisualAid = await VisualAid.countDocuments();
    const visualAid = await VisualAid.find()
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      data: visualAid,
      success: true,
      pagination: {
        totalvisualAid,
        totalPages: Math.ceil(totalvisualAid / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const fields = await req.formData();
    const visualAid = fields.get("galleryName");
    const image = fields.get("image");

    if (!image || !visualAid) {
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
    const newVisualAid = new VisualAid({
      visualAid,
      image: {
        secure_url: cloudinaryResponse.secure_url,
        public_id: cloudinaryResponse.public_id,
      },
    });

    await newVisualAid.save();

    return NextResponse.json({
      message: "VisualAid Created Successfully!",
      success: true,
      data: newVisualAid,
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

    const updatedVisualAid = await VisualAid.findOneAndUpdate(
      { id },
      { active },
      { new: true }
    );

    if (!updatedVisualAid) {
      return NextResponse.json({
        message: "VisualAid not found!",
        success: false,
      });
    }

    return NextResponse.json({
      message: "VisualAid status updated successfully!",
      success: true,
      data: updatedVisualAid,
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
    const visualAid = fields.get("visualAid");
    const image = fields.get("image");

    if (!id || !visualAid) {
      return NextResponse.json({
        message: "ID and visualAid name are required.",
        success: false,
      });
    }

    // Find existing visualAid
    const existingVisualAid = await VisualAid.findById(id);
    if (!existingVisualAid) {
      return NextResponse.json({
        message: "VisualAid not found.",
        success: false,
      });
    }

    let updatedImage = existingVisualAid.image;

    // If a new image is uploaded, delete the old one and upload the new one
    if (image) {
      const fileBuffer = await image.arrayBuffer();
      const mimeType = image.type;
      const encoding = "base64";
      const base64Data = Buffer.from(fileBuffer).toString("base64");
      const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
      const originalFilename = image.name;

      // Delete previous image from Cloudinary
      if (existingVisualAid.image?.public_id) {
        await deleteFile(existingVisualAid.image.public_id);
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

    // Update visualAid in database
    existingVisualAid.visualAid = visualAid;
    existingVisualAid.image = updatedImage;

    await existingVisualAid.save();

    return NextResponse.json({
      message: "VisualAid updated successfully!",
      success: true,
      data: existingVisualAid,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({
        message: "VisualAid ID is required.",
        success: false,
      });
    }

    // Find existing visualAid
    const existingVisualAid = await VisualAid.findById(id);
    if (!existingVisualAid) {
      return NextResponse.json({
        message: "VisualAid not found.",
        success: false,
      });
    }
    // Delete image from Cloudinary
    if (existingVisualAid.image?.public_id) {
      await deleteFile(existingVisualAid.image.public_id);
    }

    await VisualAid.findByIdAndDelete(id);

    return NextResponse.json({
      message: "VisualAid deleted successfully!",
      success: true,
    });
  } catch (err) {
    return NextResponse.json({ message: err.message, success: false });
  }
}
