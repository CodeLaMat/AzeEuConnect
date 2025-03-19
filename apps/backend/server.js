import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

// ✅ Ensure `.js` is included in imports
import userRouter from "./src/routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/users", userRouter);

app.listen(5001, () => console.log("🚀 Server running on port 5001"));
