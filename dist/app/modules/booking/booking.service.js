"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
const booking_model_1 = require("./booking.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const payment_utils_1 = require("../payment/payment.utils");
const user_model_1 = require("../user/user.model");
const bike_model_1 = __importDefault(require("../bike/bike.model"));
// booking create service
const createBookingIntoDB = (payload, loggedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingData = Object.assign(Object.assign({}, payload), { userId: loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.id });
    // find bike and update available status
    yield bike_model_1.default.findByIdAndUpdate(payload.bikeId, {
        isAvailable: false,
    });
    const user = yield user_model_1.User.findById(loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.id);
    const transactionId = `TXN${Date.now()}${Math.floor(10000 + Math.random() * 90000)}`;
    const paymentInfo = {
        transactionId,
        amount: '100',
        customerName: user === null || user === void 0 ? void 0 : user.name,
        customerEmail: user === null || user === void 0 ? void 0 : user.email,
        customerPhone: user === null || user === void 0 ? void 0 : user.phone,
        customerAddress: user === null || user === void 0 ? void 0 : user.address,
        paidStatus: 'initial-paid',
    };
    const paymentSession = yield (0, payment_utils_1.initiatePayment)(paymentInfo);
    const bookingWithPayment = Object.assign(Object.assign({}, bookingData), { transactionId });
    const result = yield booking_model_1.Booking.create(bookingWithPayment);
    return { result, paymentSession };
});
const updateBookingWithPayment = (id, loggedUser, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const findBookedBike = yield booking_model_1.Booking.findById(id);
    if (!findBookedBike) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Rentals not found');
    }
    const user = yield user_model_1.User.findById(loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.id);
    const transactionId = `TXN${Date.now()}${Math.floor(10000 + Math.random() * 90000)}`;
    const paymentInfo = {
        transactionId,
        amount: amount,
        customerName: user === null || user === void 0 ? void 0 : user.name,
        customerEmail: user === null || user === void 0 ? void 0 : user.email,
        customerPhone: user === null || user === void 0 ? void 0 : user.phone,
        customerAddress: user === null || user === void 0 ? void 0 : user.address,
        paidStatus: 'full-paid',
    };
    const paymentSession = yield (0, payment_utils_1.initiatePayment)(paymentInfo);
    const bookingWithPayment = {
        paidStatus: 'full-paid',
        transactionId,
    };
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, {
        paidStatus: bookingWithPayment.paidStatus,
        transactionId: bookingWithPayment.transactionId,
    });
    return { result, paymentSession };
});
// update booking
const updateBookingIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // find is booking by id
    const findBookedBike = yield booking_model_1.Booking.findById(id);
    //   find bike using the bikeId in the findBookedBike variable
    const findBike = yield bike_model_1.default.findById(findBookedBike === null || findBookedBike === void 0 ? void 0 : findBookedBike.bikeId);
    //   check not find the booked bike then send error
    if (!findBookedBike) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Rentals not found');
    }
    //   get current date and booked time date
    const currentTime = new Date().getTime();
    const bookedTime = findBookedBike === null || findBookedBike === void 0 ? void 0 : findBookedBike.startTime.getTime();
    //   make the hours different
    const differenceHours = (currentTime - bookedTime) / (1000 * 60 * 60);
    //   calculation it and multiply that hours and price per hour
    const totalCost = Number(differenceHours) * Number(findBike === null || findBike === void 0 ? void 0 : findBike.pricePerHour);
    // find bike and update available status true
    yield bike_model_1.default.findByIdAndUpdate(findBookedBike === null || findBookedBike === void 0 ? void 0 : findBookedBike.bikeId, {
        isAvailable: true,
    });
    //   update return bike booking rentals
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, {
        returnTime: new Date(),
        totalCost: totalCost.toFixed(0),
        isReturned: true,
    }, { new: true });
    return result;
});
// get all booking
const getMyAllBookingsIntoDB = (loggedUser, paidStatus) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (paidStatus === 'initial-paid') {
        result = yield booking_model_1.Booking.find({
            userId: loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.id,
            paidStatus: 'initial-paid',
            isReturned: true,
        }).populate('bikeId');
    }
    else if (paidStatus === 'full-paid') {
        result = yield booking_model_1.Booking.find({
            userId: loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.id,
            paidStatus: 'full-paid',
            isReturned: true,
        }).populate('bikeId');
    }
    else {
        result = yield booking_model_1.Booking.find({
            userId: loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.id,
        }).populate('bikeId');
    }
    return result;
});
const getMyAllBookingsForAdminIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find().populate('bikeId');
    return result;
});
exports.BookingServices = {
    createBookingIntoDB,
    updateBookingIntoDB,
    getMyAllBookingsIntoDB,
    updateBookingWithPayment,
    getMyAllBookingsForAdminIntoDB,
};
