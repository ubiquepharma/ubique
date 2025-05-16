import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const sliderSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        default: uuidv4,
    },
    slider : { type: String, required: true },
    image: {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true },
    },
    active: { type: Boolean, default: true },
});

sliderSchema.index({ createdAt: -1, id: 1 });

const Slider = mongoose.models.Slider || mongoose.model("Slider", sliderSchema);

export default Slider