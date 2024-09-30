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
exports.BikeServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const bike_model_1 = __importDefault(require("./bike.model"));
// insert bike information data into database using mongoose
const createBikeIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const result = yield bike_model_1.default.create(payload);
    return result;
});
// get all bikes form database
const getAllBikesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const bikeQuery = new QueryBuilder_1.default(bike_model_1.default.find(), query)
        .search(['name'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield bikeQuery.modelQuery;
    const meta = yield bikeQuery.countTotal();
    return {
        meta,
        result,
    };
});
const getSingleBikeFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findBike = yield bike_model_1.default.findById(id);
    if (!findBike) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Bike not found');
    }
    return findBike;
});
// update bike from database
const updateBikeIntoDB = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    // check the requested update bike are available
    const findBike = yield bike_model_1.default.findById(id);
    if (!findBike) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Bike not found');
    }
    const result = yield bike_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
// delete bike from database
const deleteBikeFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // check the requested delete bike are available
    const findBike = yield bike_model_1.default.findById(id);
    if (!findBike) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Bike not found');
    }
    const result = yield bike_model_1.default.findByIdAndDelete(id, { new: true });
    return result;
});
exports.BikeServices = {
    createBikeIntoDB,
    getAllBikesFromDB,
    updateBikeIntoDB,
    deleteBikeFromDB,
    getSingleBikeFromDB,
};
