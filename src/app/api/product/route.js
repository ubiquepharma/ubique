import { connectDB } from "@/lib/connection";
import Product from "@/model/product";
import { NextResponse } from "next/server";
import { deleteFile, uploadFile } from "@/middlewares/cloudinary";
import { generateCustomId } from "@/utils/generateCustomId";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const searchTerm = searchParams.get("search");
    const productId = searchParams.get("productId");
    const limit = parseInt(searchParams.get("limit")) || 10;
    const page = parseInt(searchParams.get("page")) || 1;
    const isActive = searchParams.get("isActive");

    let filter = {};

    if (category) {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (searchTerm) {
      const regex = new RegExp(searchTerm.trim(), "i");
      filter.$or = [
        { brand: { $regex: regex } },
        { composition: { $regex: regex } },
        { category: { $regex: regex } },
      ];
    }

    if (productId) {
      filter.productId = productId;
    }

    if (isActive !== null && isActive !== undefined) {
      filter.active = isActive === "true";
    }

    const totalProducts = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      data: products,
      success: true,
      pagination: {
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
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

    if (
      !brand ||
      !category ||
      !packagingsize ||
      !image ||
      !mrp ||
      !moq ||
      !applicationType
    ) {
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

    const productId = await generateCustomId(Product, "productId", "productId");

    const newProduct = new Product({
      productId,
      brand,
      category,
      packagingsize,
      mrp,
      moq,
      businessType,
      applicationType,
      medicineType,
      composition,
      expireDate,
      image: {
        secure_url: cloudinaryResponse.secure_url,
        public_id: cloudinaryResponse.public_id,
      },
    });

    await newProduct.save();

    return NextResponse.json({
      message: "Product Created Successfully!",
      success: true,
      data: newProduct,
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

    const updatedProduct = await Product.findOneAndUpdate(
      { id },
      { active },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({
        message: "Product not found!",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Product status updated successfully!",
      success: true,
      data: updatedProduct,
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
        message: "Product ID is required.",
        success: false,
      });
    }

    // Find existing popup
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return NextResponse.json({
        message: "Product not found.",
        success: false,
      });
    }
    // Delete image from Cloudinary
    if (existingProduct.image?.public_id) {
      await deleteFile(existingProduct.image.public_id);
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Product deleted successfully!",
      success: true,
    });
  } catch (err) {
    return NextResponse.json({ message: err.message, success: false });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const fields = await req.formData();
    const id = fields.get("id");
    const brand = fields.get("brand");
    const category = fields.get("category");
    const moleculeAndStrength = fields.get("moleculeAndStrength");
    const packagingsize = fields.get("packagingsize");
    const applicationType = fields.get("applicationType");
    const mrp = fields.get("mrp");
    const ptr = fields.get("ptr");
    const pts = fields.get("pts");
    const image = fields.get("image");

    console.log(
      id,
      brand,
      category,
      moleculeAndStrength,
      packagingsize,
      mrp,
      ptr,
      pts,
      applicationType,
      image
    );

    if (
      !id ||
      !brand ||
      !category ||
      !packagingsize ||
      !moleculeAndStrength ||
      !mrp ||
      !ptr ||
      !applicationType ||
      !pts
    ) {
      return NextResponse.json({
        message: "Some fields are missing.",
        success: false,
      });
    }

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return NextResponse.json({
        message: "Product not found.",
        success: false,
      });
    }

    let updatedImage = existingProduct.image;

    if (image && image.size > 0) {
      const fileBuffer = await image.arrayBuffer();
      const mimeType = image.type;
      const encoding = "base64";
      const base64Data = Buffer.from(fileBuffer).toString("base64");
      const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
      const originalFilename = image.name;

      if (existingProduct.image?.public_id) {
        await deleteFile(existingProduct.image.public_id);
      }

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

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      {
        brand,
        category,
        moleculeAndStrength: JSON.parse(moleculeAndStrength || "[]"),
        packagingsize,
        mrp,
        ptr,
        pts,
        applicationType,
        image: updatedImage,
      },
      { new: true }
    );

    console.log(updatedProduct); 

    if (!updatedProduct) {
      return NextResponse.json({
        message: "Product update failed.",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Product updated successfully!",
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}