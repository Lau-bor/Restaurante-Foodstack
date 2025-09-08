import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  url: { type: String, required: true },        
  public_id: { type: String, required: true }   
});

const menuSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    deliveryTime: { type: String }, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    files: [fileSchema] 
  },
  { timestamps: true }
);

export default mongoose.model("Menu", menuSchema);
