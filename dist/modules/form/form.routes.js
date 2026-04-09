"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cloudinary_1 = __importDefault(require("../../utils/cloudinary"));
const form_controller_1 = require("./form.controller");
const router = (0, express_1.Router)();
router.post("/upload", cloudinary_1.default.single("file"), form_controller_1.uploadDocument);
router.post("/", form_controller_1.createCandidate);
exports.default = router;
