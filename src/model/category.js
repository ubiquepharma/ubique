import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const categorySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
      default: uuidv4
    },
    category: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.index({ createdAt: -1, id: 1 });

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category
