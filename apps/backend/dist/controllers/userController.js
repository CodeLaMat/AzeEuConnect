"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
// If you want to sign a JWT here, import jsonwebtoken
// But often NextAuth will handle JWT generation for sessions
// import jwt from "jsonwebtoken";
const prisma = new client_1.PrismaClient();
/**
 * POST /api/auth/register
 * Register a new user with email, password, (optionally) role
 */
const registerUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        // Hash the password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Create the user
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: role || "user", // fallback to "user" if no role specified
            },
        });
        // (Optional) If you'd like to sign your own token here, do so.
        // NextAuth typically handles JWT creation for the session,
        // so you might just return the user data.
        // const token = jwt.sign(
        //   { id: newUser.id, role: newUser.role },
        //   process.env.JWT_SECRET as string,
        //   { expiresIn: "1d" }
        // );
        return res.status(201).json({
            id: newUser.id,
            email: newUser.email,
            role: newUser.role,
            // token, // if you choose to include a custom JWT
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Registration failed" });
    }
};
exports.registerUser = registerUser;
/**
 * POST /api/auth/login
 * Verify credentials, return user data
 *
 * NextAuth's CredentialsProvider will call this endpoint,
 * and you'll return { id, email, role } if valid.
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Compare password
        const isValid = await bcrypt_1.default.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // (Optional) sign your own token if needed.
        // NextAuth will create a separate JWT for the session,
        // but you may want to return a token for other uses (mobile app, etc.).
        // const token = jwt.sign(
        //   { id: user.id, role: user.role },
        //   process.env.JWT_SECRET as string,
        //   { expiresIn: "1d" }
        // );
        // Return user fields that NextAuth will need:
        return res.status(200).json({
            id: user.id,
            email: user.email,
            role: user.role,
            // token,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
exports.loginUser = loginUser;
