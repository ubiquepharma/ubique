import { connectDB } from "@/lib/connection";
import Package from "@/model/packaging";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await connectDB();
    const data = await Package.find({});
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const { packaging } = await req.json();
    if (!packaging) {
      return NextResponse.json({ message: "Please Enter a packaging name" });
    }

    await Package.create({ packaging });
    return NextResponse.json({
      message: "Package Created Successfully!",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const { id, packaging } = await req.json();

    if (!id || !packaging) {
      return NextResponse.json({
        message: "ID and packaging name are required.",
        success: false,
      });
    }

    const updatedPackage = await Package.findOneAndUpdate(
      { id },
      { packaging },
      { new: true }
    );

    if (!updatedPackage) {
      return NextResponse.json({
        message: "Package not found!",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Package Updated Successfully!",
      success: true,
      data: updatedPackage,
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

    await Package.findOneAndDelete({ id });
    return NextResponse.json({
      message: "Package Deleted Successfully!",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
