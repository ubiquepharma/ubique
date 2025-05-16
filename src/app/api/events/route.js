import { connectDB } from "@/lib/connection";
import { deleteFile, uploadFile } from "@/middlewares/cloudinary";
import Events from "@/model/events";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit")) || 10;
    const page = parseInt(searchParams.get("page")) || 1;

    const totalevents = await Events.countDocuments();
    const events = await Events.find()
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      data: events,
      success: true,
      pagination: {
        totalevents,
        totalPages: Math.ceil(totalevents / limit),
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
    const event = fields.get("galleryName");
    const image = fields.get("image");

    console.log(event, image);

    if (!image || !event) {
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
    const newEvents = new Events({
      event,
      image: {
        secure_url: cloudinaryResponse.secure_url,
        public_id: cloudinaryResponse.public_id,
      },
    });

    await newEvents.save();

    return NextResponse.json({
      message: "Events Created Successfully!",
      success: true,
      data: newEvents,
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

    const updatedEvents = await Events.findOneAndUpdate(
      { id },
      { active },
      { new: true }
    );

    if (!updatedEvents) {
      return NextResponse.json({
        message: "Events not found!",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Events status updated successfully!",
      success: true,
      data: updatedEvents,
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
    const event = fields.get("event");
    const image = fields.get("image");

    if (!id || !event) {
      return NextResponse.json({
        message: "ID and event name are required.",
        success: false,
      });
    }

    // Find existing event
    const existingEvents = await Events.findById(id);
    if (!existingEvents) {
      return NextResponse.json({
        message: "Events not found.",
        success: false,
      });
    }

    let updatedImage = existingEvents.image;

    // If a new image is uploaded, delete the old one and upload the new one
    if (image) {
      const fileBuffer = await image.arrayBuffer();
      const mimeType = image.type;
      const encoding = "base64";
      const base64Data = Buffer.from(fileBuffer).toString("base64");
      const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
      const originalFilename = image.name;

      // Delete previous image from Cloudinary
      if (existingEvents.image?.public_id) {
        await deleteFile(existingEvents.image.public_id);
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

    // Update event in database
    existingEvents.event = event;
    existingEvents.image = updatedImage;

    await existingEvents.save();

    return NextResponse.json({
      message: "Events updated successfully!",
      success: true,
      data: existingEvents,
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
        message: "Events ID is required.",
        success: false,
      });
    }

    // Find existing event
    const existingEvents = await Events.findById(id);
    if (!existingEvents) {
      return NextResponse.json({
        message: "Events not found.",
        success: false,
      });
    }
    // Delete image from Cloudinary
    if (existingEvents.image?.public_id) {
      await deleteFile(existingEvents.image.public_id);
    }

    await Events.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Events deleted successfully!",
      success: true,
    });
  } catch (err) {
    return NextResponse.json({ message: err.message, success: false });
  }
}
