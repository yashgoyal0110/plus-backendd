import mongoose from "mongoose";

const couseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: [3, "Must contain atleast 3 characters"],
  },
  code: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
    minLength: [3, "Must contain atleast 3 characters"],
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  validity: {
    type: String,
    required: [true, "validity is required!"],
  },
  imageUrl: {
    type: String,
    required: [true, "Image is required!"],
  },
  embedLink1: {
    type: String,
    required: [true, "Video Link is required!"],
  },
  embedLink2: {
    type: String,
    required: [true, "Video Link is required!"],
  },
});

export const Courses = mongoose.model("Courses", couseSchema);
