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
const paymentSchema = new mongoose_1.Schema({
    Amount: {
        type: Number,
        required: true,
    },
    offense_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Offense',
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
const PaymentModel = (0, mongoose_1.model)('Payment', paymentSchema);
exports.default = PaymentModel;
