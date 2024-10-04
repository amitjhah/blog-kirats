"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatepostinupt = exports.createpostinput = exports.signininput = exports.signupinput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupinput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(4),
    name: zod_1.default.string().optional()
});
exports.signininput = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(4)
});
exports.createpostinput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
exports.updatepostinupt = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
