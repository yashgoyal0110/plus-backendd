import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";
export const studentRegister = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      dob,
      referalCode,
      role,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !gender ||
      !dob ||
      !role
    ) {
      return res
        .status(400)
        .json({ message: "filling all details is compulsory" });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      dob,
      referalCode,
      role: "Student",
    });
    generateToken(user, "user registered!", 200, res);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Missing Email" });
    }
    if (!password) {
      return res.status(400).json({ message: "Missing Password" });
    }
    if (!role) {
      return res.status(400).json({ message: "Missing Role" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ message: "user with specified email don't exists" });
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Invalid password" });
    }
    if (role != user.role) {
      return res.status(400).json({ message: "User with this role not found" });
    }
    generateToken(user, "user loggedIn!", 200, res);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const addNewAdmin = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      dob,
      referalCode,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !gender ||
      !dob
    ) {
      return res
        .status(400)
        .json({ message: "filling all details is compulsory" });
    }
    let admin = await User.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      dob,
      referalCode,
      role: "Admin",
    });
    return res.status(200).json({ message: "New Admin Registered" });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const getAllInstructors = async (req, res, next) => {
  try {
    const instructors = await User.find({ role: "Instructor" });
    return res.status(200).json({ instructors });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
export const getUserDetails = async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
};

export const logoutAdmin = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("adminToken", "", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(Date.now()),
      })
      .json({
        message: "Admin loggedOut successfully",
      });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const logoutStudent = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("studentToken", "", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(Date.now()),
      })
      .json({
        message: "Student loggedOut successfully",
      });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const addNewInstructor = async (req, res, next) => {
  try {
    if (!req.files || !req.files.instAvatar) {
      return res.status(400).json({
        message: "Instructor Avatar is required",
      });
    }
    const { instAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(instAvatar.mimetype)) {
      return res.status(400).json({ message: "File Format not supported" });
    }
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      dob,
      referalCode,
      instructorCourse,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !gender ||
      !dob ||
      !instructorCourse
    ) {
      return res.status(400).json({
        message: "Please provide all details",
      });
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
      instAvatar.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(
        "Cloudinary error: ",
        cloudinaryResponse.error || "cloudinary error"
      );
    }
    const instructor = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      dob,
      referalCode,
      instructorCourse,
      role: "Instructor",
      instAvatar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    return res
      .status(200)
      .json({ message: "Instructor added successfully", instructor });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const deleteInstructor = async (req, res, next) => {
  try {
    const { id } = req.params;
    let user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "Instructor don't exists" });
    }
    await user.deleteOne();
    return res.status(200).json({ message: "Instructor successfully deleted" });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
