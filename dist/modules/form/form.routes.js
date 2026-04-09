"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cloudinary_1 = __importDefault(require("../../utils/cloudinary"));
const form_controller_1 = require("./form.controller");
/* ============================================================
   Form / Candidate Routes
   Base path: /api/candidate  (mounted in app.ts)
============================================================ */
const router = (0, express_1.Router)();
// POST /api/candidate/upload — upload single document to Cloudinary
router.post("/upload", cloudinary_1.default.single("file"), form_controller_1.uploadDocument);
// POST /api/candidate  — submit candidate form with document URLs
router.post("/", form_controller_1.createCandidate);
// GET /api/candidate   — fetch all submitted candidates
router.get("/", form_controller_1.getAllCandidates);
exports.default = router;
