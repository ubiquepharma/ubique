import { connectDB } from "@/lib/connection";
import Strength from "@/model/strength";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const data = await Strength.find({});
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const { strength } = await req.json();
    if (!strength) {
      return NextResponse.json({ message: "Please Enter a strength name" });
    }

    await Strength.create({ strength });
    return NextResponse.json({
      message: "Strength Created Successfully!",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const { id, strength } = await req.json();

    if (!id || !strength) {
      return NextResponse.json({
        message: "ID and strength name are required.",
        success: false,
      });
    }

    const updatedStrength = await Strength.findOneAndUpdate(
      { id },
      { strength },
      { new: true }
    );

    if (!updatedStrength) {
      return NextResponse.json({
        message: "Strength not found!",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Strength Updated Successfully!",
      success: true,
      data: updatedStrength,
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
        message: "ID is required.",
        success: false,
      });
    }

    await Strength.findOneAndDelete({ id });
    return NextResponse.json({
      message: "Strength Deleted Successfully!",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
