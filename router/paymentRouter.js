import express from "express";
import { payment } from "../controllers/paymentController.js";
const router = express.Router();
router.post('/buy', payment)
export default router;