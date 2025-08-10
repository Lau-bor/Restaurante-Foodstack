import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  menu: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
  quantity: { type: Number, required: true }
});

const usersOrdersSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('UserOrder', usersOrdersSchema);