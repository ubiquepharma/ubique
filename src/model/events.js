import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const eventsSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    default: uuidv4,
  },
  event: { type: String, required: true },
  image: {
    secure_url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  active: { type: Boolean, default: true },
});

eventsSchema.index({ createdAt: -1, id: 1 });

const Events = mongoose.models.Events || mongoose.model("Events", eventsSchema);

export default Events;