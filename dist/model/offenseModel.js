"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Offense = void 0;
const mongoose_1 = require("mongoose");
const offenseSchema = new mongoose_1.Schema({
    offender_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    police_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    offense_type: {
        type: String,
        enum: ['overspeeding', 'one-way', 'wrong-parking'],
        required: true
    },
    offense_status: {
        type: String,
        enum: ['pending', 'settled'],
        required: true
    },
    appeal_offense: {
        type: Boolean,
        required: true
    },
    appeal_offense_status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        required: true
    },
    offense_evidence: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
    }
});
const Offense = (0, mongoose_1.model)('Offense', offenseSchema);
exports.Offense = Offense;
