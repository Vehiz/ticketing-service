import express from "express";
import {registerUser, offenseRegister, updateUser, paymentRegister, paystackPayment, } from "../controller/userController";
import { upload } from "../utils/cloudinary";

const router = express.Router();

router.post("/register", registerUser);
router.post("/register_offense", offenseRegister);
router.patch("/update/:id",upload.single('profile_picture'), updateUser)
router.post("/register_payment", paymentRegister);
router.post('/paystack', paystackPayment)


export default router;