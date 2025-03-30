import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from "@packages/db";
import userRouter from "./src/routes/userRoutes";
import profileRouter from "./src/routes/profileRoutes";
import usersRouter from "./src/routes/allUsersRoutes";
import roleRouter from "./src/routes/roleRoutes";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/auth", userRouter);
app.use("/api", profileRouter);
app.use("/api", usersRouter);
app.use("/api", roleRouter);

process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(process.env.PORT, () =>
  console.log("🚀 Server running on port 5001")
);
