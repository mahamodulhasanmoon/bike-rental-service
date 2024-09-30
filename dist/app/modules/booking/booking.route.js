"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const booking_controller_1 = require("./booking.controller");
const router = (0, express_1.Router)();
// all booking routes
router.post('/', (0, auth_1.default)('admin', 'user'), (0, validateRequest_1.default)(booking_validation_1.BookingValidations.createBookingValidationSchema), booking_controller_1.BookingController.createBooking);
// all booking routes
router.put('/pay/:id', (0, auth_1.default)('admin', 'user'), booking_controller_1.BookingController.updateBookingWithPayment);
router.put('/:id/return', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(booking_validation_1.BookingValidations.updateBookingValidationSchema), booking_controller_1.BookingController.updateBooking);
router.get('/', (0, auth_1.default)('admin', 'user'), booking_controller_1.BookingController.getMyAllBookings);
router.get('/initial-paid', (0, auth_1.default)('admin'), booking_controller_1.BookingController.getMyAllBookingsForAdmin);
exports.BookingRoutes = router;
