import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./src/routes/userRoutes";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/auth", userRouter);

app.listen(5001, () => console.log("🚀 Server running on port 5001"));
