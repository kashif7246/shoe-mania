import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      // required: true
    },
    city: {
      type: String,
      // required: true
    },
    state: {
      type: String,
      // required: true
    },
    country: {
      type: String,
      // required: true
    },
    postalCode: {
      type: Number,
      // required: true
    },
    phoneNo: {
      type: Number,
      // required: true
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        // required: true
      },
      price: {
        type: Number,
        // required: true
      },
      quantity: {
        type: Number,
        // required: true
      },
      image: {
        type: String,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        // required: true
      },
    },
  ],
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  itemsPrice: {
    type: Number,
    default: 0,
  },
  taxPrice: {
    type: Number,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  orderStatus: {
    type: String,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Order = mongoose.model("Order", orderSchema);
