import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  public_id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  }
});

const menuSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "El título es obligatorio"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "La descripción es obligatoria"],
  },
  price: {
    type: Number,
    required: [true, "El precio es obligatorio"],
  },
  deliveryTime: {
    type: String,
    default: "30-40 min",
  },
  files: [fileSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Menu", menuSchema);
