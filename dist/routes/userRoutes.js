"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const cloudinary_1 = require("../utils/cloudinary");
const router = express_1.default.Router();
router.post("/register", userController_1.registerUser);
router.post("/register_offense", userController_1.offenseRegister);
router.patch("/update/:id", cloudinary_1.upload.single('profile_picture'), userController_1.updateUser);
router.post("/register_payment", userController_1.paymentRegister);
exports.default = router;
