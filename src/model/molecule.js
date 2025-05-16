import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const moleculeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
      default: uuidv4
    },
    molecule: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

moleculeSchema.index({ createdAt: -1, id: 1 });

const Molecule = mongoose.models.Molecule || mongoose.model("Molecule", moleculeSchema);

export default Molecule