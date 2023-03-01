"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRegister = exports.offenseRegister = exports.updateUser = exports.registerUser = void 0;
const userModel_1 = __importStar(require("../model/userModel"));
const offenseModel_1 = require("../model/offenseModel");
const utility_1 = require("../utils/utility");
const paymentModel_1 = __importDefault(require("../model/paymentModel"));
// Register User
const registerUser = async (req, res) => {
    try {
        const { phoneNumber, firstName, lastName, NIN } = req.body;
        // Check if user exist
        const existingUser = await userModel_1.default.findOne(phoneNumber);
        if (!existingUser) {
            const newUser = new userModel_1.default({
                phoneNumber,
                firstName,
                lastName,
                NIN,
                userType: userModel_1.UserType.Offender,
            });
            // Save the new user document
            const user = await newUser.save();
            // Generate token
            const signature = await (0, utility_1.generateToken)({
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
            });
            res.status(200).json({
                message: "user created successfully",
                user,
                signature,
            });
        }
        res.status(404).json({
            message: "User already exist",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.registerUser = registerUser;
// Update User
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { phoneNumber, profile_picture } = req.body;
        console.log('let us go');
        // Find user by Id
        const user = await userModel_1.default.findByIdAndUpdate(id, { phoneNumber, profile_picture: req.file?.path }, { new: true });
        console.log('i am here');
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        // Update user profile
        return res.status(200).json({
            message: "user updated successfully",
            user
            // id:user._id,
            // phoneNumber:user.phoneNumber,
            // profile_picture:user.profile_picture
        });
    }
    catch (error) {
        res.status(500).json({
            Error: error.message,
        });
    }
};
exports.updateUser = updateUser;
// Offense Registration
const offenseRegister = async (req, res) => {
    try {
        const { offender_id, police_id, offense_type, offense_status, appeal_offense, appeal_offense_status, offense_evidence, } = req.body;
        const user = await userModel_1.default.findOne({ offender_id });
        const newOffense = new offenseModel_1.Offense({
            offender_id,
            police_id,
            offense_type,
            offense_status,
            appeal_offense,
            appeal_offense_status,
            offense_evidence,
            created_at: new Date(),
        });
        const offense = await newOffense.save();
        res.status(201).json({
            message: "Offense registered succesfully",
            newOffense,
        });
    }
    catch (error) {
        res.status(500).json({
            Error: error.message,
            message: "Internal server error",
        });
    }
};
exports.offenseRegister = offenseRegister;
// Payment
const paymentRegister = async (req, res) => {
    try {
        const { Amount, offense_id } = req.body;
        const payment = new paymentModel_1.default({ Amount, offense_id });
        const paymentRecord = await payment.save();
        return res.status(200).json({
            message: "payment recorded successfully",
            paymentRecord
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            Error: error.message
        });
    }
};
exports.paymentRegister = paymentRegister;
