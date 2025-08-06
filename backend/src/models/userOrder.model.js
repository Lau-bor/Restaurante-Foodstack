import mongoose from 'mongoose';

const userOrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  items: [{
    menuItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Menu', 
      required: true
    },
    name: {
      type: String,
      required: true 
    },
    price: {
      type: Number,
      required: true 
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed'], 
    default: 'pending' 
  },
  paymentId: {
    type: String 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('UserOrder', userOrderSchema);

