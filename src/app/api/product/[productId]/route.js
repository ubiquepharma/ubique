import { NextResponse } from "next/server";

import { deleteFile, uploadFile } from "@/middlewares/cloudinary";
import Product from "@/model/product";
import { connectDB } from "@/lib/connection";

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { productId } = await params;

    if (!productId) {
      return NextResponse.json({
        message: "Product ID is required.",
        success: false,
      });
    }

    const fields = await req.formData();

    const brand = fields.get("brand");
    const category = fields.get("category");
    const packagingsize = fields.get("packagingsize");
    const mrp = fields.get("mrp");
    const moq = fields.get("moq");
    const businessType = fields.get("businessType");
      const applicationType = fields.get("applicationType");
    const medicineType = fields.get("medicineType");
    const composition = fields.get("composition");
    const expireDate = fields.get("expireDate");

    const image = fields.get("image");

    // Prepare data for update
    const updatedData = {
      brand,
      category,
      packagingsize,
      mrp,
      moq,
      businessType,
      medicineType,
      composition,
      expireDate,
      applicationType
    };

    if (typeof image === File) {
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

      updatedData.image = {
        secure_url: cloudinaryResponse.secure_url,
        public_id: cloudinaryResponse.public_id,
      };
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { productId },
      updatedData,
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      return NextResponse.json({
        message: "Product not found!",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Product updated successfully!",
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message, success: false });
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { productId } = params;

    if (!productId) {
      return NextResponse.json({
        message: "Product ID is required.",
        success: false,
      });
    }

    const { active } = await req.json();

    if (typeof active !== "boolean") {
      return NextResponse.json({
        message: "Active state must be a boolean.",
        success: false,
      });
    }

    // Find and update the product
    const updatedProduct = await Product.findOneAndUpdate(
      { productId },
      { active },
      { new: true } // Return the updated product
    );

    if (!updatedProduct) {
      return NextResponse.json({
        message: "Product not found!",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Product updated successfully!",
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message, success: false });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { productId } = params;

    if (!productId) {
      return NextResponse.json({
        message: "Product ID is required.",
        success: false,
      });
    }

    // Find existing product by productId
    const existingProduct = await Product.findOne({ productId });

    if (!existingProduct) {
      return NextResponse.json({
        message: "Product not found.",
        success: false,
      });
    }

    // Delete images from Cloudinary if any
    if (existingProduct.image?.public_id) {
      await deleteFile(existingProduct.image.public_id);
    }

    // Delete product from the database by productId
    await Product.deleteOne({ productId });

    return NextResponse.json({
      message: "Product deleted successfully!",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
