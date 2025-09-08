import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  name: { type: String },
  size: { type: Number },
  mimetype: { type: String },
  url: { type: String, required: true },
  public_id: { type: String, required: true },
  contentType: { type: String },
});

const menuSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    deliveryTime: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    files: [fileSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Menu", menuSchema);
