import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  dueDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  files: [
    {
      name: String,
      path: String,
      size: Number,
      mimetype: String,
    },
  ],
}, {
  timestamps: true,
  versionKey: false,
});


export default mongoose.model("Menu", MenuSchema);
