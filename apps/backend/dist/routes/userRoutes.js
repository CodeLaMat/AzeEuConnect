"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_js_1 = require("../controllers/userController.js");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.json({ message: "User routes working!" });
});
router.post("/register", userController_js_1.registerUser);
router.post("/login", userController_js_1.loginUser);
// ✅ Use ES6 Export
exports.default = router;
