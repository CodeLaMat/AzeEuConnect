import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from "@repo/db";
import userRouter from "./src/routes/userRoutes";
import profileRouter from "./src/routes/profileRoutes";
import usersRouter from "./src/routes/allUsersRoutes";
import roleRouter from "./src/routes/roleRoutes";
import serviceRouter from "./src/routes/serviceRoutes";

dotenv.config({
  path:
    process.env.NODE_ENV === "production" ? ".env.production" : ".env.local",
});

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
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
app.use("/api", serviceRouter);

process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await prisma.$disconnect();
  process.exit(0);
});

cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
