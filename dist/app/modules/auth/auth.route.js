"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("../user/user.validation");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
// assign auth routes
// signup user
router.post('/signup', (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserValidationSchema), auth_controller_1.AuthController.signupUser);
// login user
router.post('/login', (0, validateRequest_1.default)(user_validation_1.UserValidation.loginUserValidationSchema), auth_controller_1.AuthController.loginUser);
router.post('/refresh-token', (0, validateRequest_1.default)(user_validation_1.UserValidation.refreshTokenValidationSchema), auth_controller_1.AuthController.refreshToken);
exports.AuthRoutes = router;
