import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  date:{
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
});

export const Payments = mongoose.model("Payments", paymentSchema);
