import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const visualAidSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    default: uuidv4,
  },
  visualAid: { type: String, required: true },
  image: {
    secure_url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  active: { type: Boolean, default: true },
});

visualAidSchema.index({ createdAt: -1, id: 1 });

const VisualAid = mongoose.models.VisualAid || mongoose.model("VisualAid", visualAidSchema);

export default VisualAid;