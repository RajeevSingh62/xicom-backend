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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
/* ============================================================
   Candidate Schema
============================================================ */
const CandidateSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    dob: {
        type: Date,
        required: [true, "Date of birth is required"],
    },
    resStreet1: {
        type: String,
        required: [true, "Residential street 1 is required"],
        trim: true,
    },
    resStreet2: {
        type: String,
        required: [true, "Residential street 2 is required"],
        trim: true,
    },
    perStreet1: {
        type: String,
        required: [true, "Permanent street 1 is required"],
        trim: true,
    },
    perStreet2: {
        type: String,
        required: [true, "Permanent street 2 is required"],
        trim: true,
    },
    documents: {
        type: [
            {
                fileName: {
                    type: String,
                    required: true,
                    trim: true,
                },
                fileType: {
                    type: String,
                    required: true,
                    enum: ["image", "pdf"],
                },
                fileUrl: {
                    type: String,
                    required: true,
                },
            },
        ],
        validate: {
            validator: (docs) => docs.length >= 2,
            message: "At least 2 documents are required",
        },
    },
}, {
    timestamps: true,
    versionKey: false,
});
const Candidate = mongoose_1.default.model("Candidate", CandidateSchema);
exports.default = Candidate;
