import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must contain atleast 8 Characters"],
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Student", "Instructor"],
  },
  instructorCourse: {
    type: String,
  },
  instAvatar: {
    public_id: String,
    url: String,
  },
});


// Hashing the password before saving the user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  

// Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate JWT
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);
