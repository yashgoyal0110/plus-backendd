import express from "express";
import { addCourse, deleteCourse, getAllCourses } from "../controllers/courseController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";
const router = express.Router();
router.post("/addnew", isAdminAuthenticated, addCourse);
router.get("/allcourses", getAllCourses);
router.delete('/deletecourse/:id', isAdminAuthenticated, deleteCourse)

export default router;
