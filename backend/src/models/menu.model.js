import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
  data: String,
  contentType: String,
});

const menuSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  files: [FileSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Menu', menuSchema);