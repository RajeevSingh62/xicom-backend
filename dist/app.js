"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const form_routes_1 = __importDefault(require("./modules/form/form.routes"));
/* ============================================================
   Express App Setup
============================================================ */
const app = (0, express_1.default)();
/* ---------- CORS ---------- */
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // Next.js dev server
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
}));
/* ---------- Body Parsers ---------- */
// NOTE: multer handles multipart/form-data so we only need JSON + urlencoded
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
/* ---------- Static Files — serve uploaded documents ---------- */
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
/* ---------- Health Check ---------- */
app.get("/api/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is up and running 🚀",
        timestamp: new Date().toISOString(),
    });
});
/* ---------- Module Routes ---------- */
app.use("/api/candidate", form_routes_1.default);
/* ---------- 404 Handler ---------- */
app.use((_req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
/* ---------- Global Error Handler (must be last) ---------- */
app.use(errorHandler_1.default);
exports.default = app;
