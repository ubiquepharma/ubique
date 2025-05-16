import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const packagingSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
      default: uuidv4
    },
    packaging: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

packagingSchema.index({ createdAt: -1, id: 1 });

const Package = mongoose.models.Package || mongoose.model("Package", packagingSchema);

export default Package
