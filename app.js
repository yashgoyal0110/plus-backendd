import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from './router/messageRouter.js'
import userRouter from './router/userRouter.js'
import slotRouter from './router/slotRouter.js'
import courseRouter from './router/courseRouter.js'
import paymentRouter from './router/paymentRouter.js'

const app = express();
config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL, "https://plus-student.vercel.app", "https://plus-admin.vercel.app"],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use('/api/v1/message', messageRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/slot', slotRouter)
app.use('/api/v1/course', courseRouter)
app.use('/api/v1/purchase', paymentRouter)
dbConnection();
export default app;
