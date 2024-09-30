"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
// assign user routes
// get profile for user
router.get('/me', (0, auth_1.default)('admin', 'user'), user_controller_1.UserController.getUserProfile);
router.get('/all', (0, auth_1.default)('admin'), user_controller_1.UserController.getAllUsers);
// update profile for user
router.put('/me', (0, auth_1.default)('admin', 'user'), (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUserValidationSchema), user_controller_1.UserController.updateUserProfile);
router.put('/role/:id', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(user_validation_1.UserValidation.updateRoleValidationSchema), user_controller_1.UserController.updateRole);
router.delete('/:id', (0, auth_1.default)('admin'), user_controller_1.UserController.deleteUsers);
exports.UserRoutes = router;
