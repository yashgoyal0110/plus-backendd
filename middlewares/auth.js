import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const isAdminAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.adminToken;
    if (!token) {
      return res.status(400).json({ message: "Admin not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user && req.user.role !== "Admin") {
      return res.status(400).json({
        message: `${req.user.role} is not authorized for this resource`,
      });
    }
    next();
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const isStudentAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.studentToken;
    if (!token) {
      return res.status(400).json({ message: "Student not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user && req.user.role !== "Student") {
      return res.status(400).json({
        message: `${req.user.role} is not authorized for this resource`,
      });
    }
    next();
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      user,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
