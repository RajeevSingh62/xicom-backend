"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
/* ============================================================
   Server Entry Point
   - Loads env variables
   - Connects to MongoDB
   - Starts Express on configured PORT
============================================================ */
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        // 1. Connect to MongoDB first
        await (0, db_1.default)();
        // 2. Start HTTP server
        app_1.default.listen(PORT, () => {
            console.log(`\n🚀 Server running in ${process.env.NODE_ENV} mode`);
            console.log(`📡 Listening on http://localhost:${PORT}`);
            console.log(`📋 API Base:  http://localhost:${PORT}/api`);
            console.log(`❤️  Health:   http://localhost:${PORT}/api/health\n`);
        });
    }
    catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
