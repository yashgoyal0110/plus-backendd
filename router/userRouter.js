import express from "express";
import {
  addNewAdmin,
  addNewInstructor,
  getAllInstructors,
  login,
  logoutAdmin,
  logoutStudent,
  studentRegister,
  getUserDetails,
  deleteInstructor,
} from "../controllers/userController.js";
import {
  isAdminAuthenticated,
  isStudentAuthenticated,
} from "../middlewares/auth.js";
const router = express.Router();
router.post("/student/register", studentRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.get("/instructors", getAllInstructors);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/student/me", isStudentAuthenticated, getUserDetails);
router.get("/student/logout", isStudentAuthenticated, logoutStudent);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.post("/instructor/addnew", isAdminAuthenticated, addNewInstructor);
router.delete("/deleteinstructor/:id", isAdminAuthenticated, deleteInstructor);
export default router;
