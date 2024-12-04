import express from "express";
import {
  deleteSlot,
  getAllSlots,
  postSlot,
  updateSlotStatus,
} from "../controllers/slotController.js";
import {
  isStudentAuthenticated,
  isAdminAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();
router.post("/post", isStudentAuthenticated, postSlot);
router.get("/getall", isAdminAuthenticated, getAllSlots);
router.put("/update/:id", isAdminAuthenticated, updateSlotStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteSlot);

export default router;
