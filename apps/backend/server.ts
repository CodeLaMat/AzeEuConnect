import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from "@packages/db";
import userRouter from "./src/routes/userRoutes";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/auth", userRouter);

process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(process.env.PORT, () =>
  console.log("🚀 Server running on port 5001")
);
