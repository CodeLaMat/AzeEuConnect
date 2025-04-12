"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("@packages/db");
const userRoutes_1 = __importDefault(require("./src/routes/userRoutes"));
const profileRoutes_1 = __importDefault(require("./src/routes/profileRoutes"));
const allUsersRoutes_1 = __importDefault(require("./src/routes/allUsersRoutes"));
const roleRoutes_1 = __importDefault(require("./src/routes/roleRoutes"));
const serviceRoutes_1 = __importDefault(require("./src/routes/serviceRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use((0, helmet_1.default)());
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
app.use("/api/auth", userRoutes_1.default);
app.use("/api", profileRoutes_1.default);
app.use("/api", allUsersRoutes_1.default);
app.use("/api", roleRoutes_1.default);
app.use("/api", serviceRoutes_1.default);
process.on("SIGINT", async () => {
    console.log("Shutting down server...");
    await db_1.prisma.$disconnect();
    process.exit(0);
});
app.listen(process.env.PORT, () => console.log("🚀 Server running on port 5001"));
