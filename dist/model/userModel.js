"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = void 0;
const mongoose_1 = require("mongoose");
var UserType;
(function (UserType) {
    UserType["Reporter"] = "Reporter";
    UserType["Officer"] = "Officer";
    UserType["Offender"] = "Offender";
    UserType["Lawyer"] = "Lawyer";
})(UserType = exports.UserType || (exports.UserType = {}));
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    NIN: { type: String, required: true },
    bookings: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Offense' }],
    police_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Police' },
    userType: { type: String, enum: Object.values(UserType), required: true },
    profile_picture: { type: String },
    created_at: { type: Date, default: Date.now }
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
