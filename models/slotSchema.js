import mongoose from "mongoose";
import validator from "validator";

const slotSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "Must contain atleast 3 characters"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Must contain atleast 3 characters"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide valid email address"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Must contain 10 digits"],
    maxnLength: [10, "Must contain 10 digits"],
  },
  referalCode: {
    type: String,
  },
  dob: {
    type: Date,
    required: [true, "DOB is required!"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Custom"],
  },
  slot_date: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  instructor: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  whatsapp: {
    type: Boolean,
    default: false,
  },
  instructorId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  studentId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  commentsIfAny: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});

export const Slots = mongoose.model("Slots", slotSchema);
