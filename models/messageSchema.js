import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
  message: {
    type: String,
    required: true,
    minLength: [10, "Must contain atleast 10 characters"],
  },
});

export const Message = mongoose.model("Message", messageSchema);
