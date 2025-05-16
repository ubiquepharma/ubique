import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const popupSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    default: uuidv4,
  },
  popup: { type: String, required: true },
  image: {
    secure_url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  active: { type: Boolean, default: true },
});

popupSchema.index({ createdAt: -1, id: 1 });

const Popup = mongoose.models.Popup || mongoose.model("Popup", popupSchema);

export default Popup