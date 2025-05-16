import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const strengthSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
      default: uuidv4
    },
    strength: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

strengthSchema.index({ createdAt: -1, id: 1 });

const Strength = mongoose.models.Strength || mongoose.model("Strength", strengthSchema);

export default Strength
