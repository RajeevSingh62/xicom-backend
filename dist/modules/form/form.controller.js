"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCandidate = exports.uploadDocument = void 0;
const form_model_1 = __importDefault(require("./form.model"));
const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};
const uploadDocument = async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "No file uploaded.",
            });
            return;
        }
        const fileUrl = req.file.path;
        res.status(200).json({
            success: true,
            message: "File uploaded successfully.",
            data: {
                fileUrl,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.uploadDocument = uploadDocument;
const createCandidate = async (req, res, next) => {
    try {
        const { firstName, lastName, email, dob, resStreet1, resStreet2, perStreet1, perStreet2, documents } = req.body;
        /* ---------- 1. Required field validation ---------- */
        if (!firstName || !lastName || !email || !dob || !resStreet1 || !resStreet2 || !perStreet1 || !perStreet2) {
            res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
            return;
        }
        /* ---------- 2. Age validation — must be >= 18 ---------- */
        const age = calculateAge(dob);
        if (age < 18) {
            res.status(400).json({
                success: false,
                message: "Candidate must be at least 18 years old.",
            });
            return;
        }
        /* ---------- 3. Documents validation ---------- */
        if (!documents || !Array.isArray(documents) || documents.length < 2) {
            res.status(400).json({
                success: false,
                message: "At least 2 documents are required.",
            });
            return;
        }
        for (const doc of documents) {
            if (!doc.fileName || !doc.fileType || !doc.fileUrl) {
                res.status(400).json({
                    success: false,
                    message: "Each document must have fileName, fileType, and fileUrl.",
                });
                return;
            }
            if (!["image", "pdf"].includes(doc.fileType)) {
                res.status(400).json({
                    success: false,
                    message: "fileType must be 'image' or 'pdf'.",
                });
                return;
            }
        }
        const candidate = await form_model_1.default.create({
            firstName,
            lastName,
            email,
            dob: new Date(dob),
            resStreet1,
            resStreet2,
            perStreet1,
            perStreet2,
            documents,
        });
        res.status(201).json({
            success: true,
            message: "Candidate submitted successfully.",
            data: candidate,
        });
    }
    catch (error) {
        if (typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === 11000) {
            res.status(409).json({
                success: false,
                message: "A candidate with this email already exists.",
            });
            return;
        }
        next(error);
    }
};
exports.createCandidate = createCandidate;
