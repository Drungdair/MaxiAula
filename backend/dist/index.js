"use strict";
/*npm run dev*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const backend_1 = __importDefault(require("./app/backend"));
backend_1.default.main();
