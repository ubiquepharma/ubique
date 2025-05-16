import { connectDB } from "@/lib/connection";
import Category from "@/model/category";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const data = await Category.find({});
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const { category } = await req.json();
    if (!category) {
      return NextResponse.json({ message: "Please Enter a category name" });
    }

    await Category.create({ category });
    return NextResponse.json({
      message: "Category Created Successfully!",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const { id, category } = await req.json();

    if (!id || !category) {
      return NextResponse.json({
        message: "ID and category name are required.",
        success: false,
      });
    }

    const updatedCategory = await Category.findOneAndUpdate(
      { id },
      { category },
      { new: true }
    );

    if (!updatedCategory) {
      return NextResponse.json({
        message: "Category not found!",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Category Updated Successfully!",
      success: true,
      data: updatedCategory,
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

    await Category.findOneAndDelete({ id });
    return NextResponse.json({
      message: "Category Deleted Successfully!",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
