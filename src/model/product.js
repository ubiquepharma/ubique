import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      unique: true,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    image: {
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true },
    },

    category: {
      type: String,
      required: true,
    },

    packagingsize: {
      type: String,
      required: true,
    },
    mrp: {
      type: String,
    },
    expireDate: {
      type: String,
    },
    moq: {
      type: String,
    },
    applicationType: {
      type: String,
    },
    businessType: {
      type: String,
    },
    medicineType: {
      type: String,
    },
    composition: {
      type: String,
    },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ createdAt: -1, id: 1 });

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
