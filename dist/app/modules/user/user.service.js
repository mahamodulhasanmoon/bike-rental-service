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
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
// get profile user
const getUserProfileFromDB = (loggedUser) => __awaiter(void 0, void 0, void 0, function* () {
    // check user exist
    const user = yield user_model_1.User.isUserExistsByEmail(loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = yield user_model_1.User.findById(user === null || user === void 0 ? void 0 : user._id);
    return result;
});
const getAllUsersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(user_model_1.User.find(), query)
        .search(['name'])
        .filter()
        .fields()
        .paginate()
        .sort();
    const result = yield userQuery.modelQuery;
    const meta = yield userQuery.countTotal();
    return {
        meta,
        result,
    };
});
// get profile user
const updateUserIntoDB = (payload, loggedUser) => __awaiter(void 0, void 0, void 0, function* () {
    // check user exist
    const user = yield user_model_1.User.isUserExistsByEmail(loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = yield user_model_1.User.findOneAndUpdate({ email: loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.email }, {
        $set: payload,
    }, { new: true });
    return result;
});
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield user_model_1.User.findById(id);
    if (!findUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = yield user_model_1.User.findByIdAndDelete(id);
    return result;
});
const updateRoleFromDB = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield user_model_1.User.findById(id);
    if (!findUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = yield user_model_1.User.findByIdAndUpdate(id, { role });
    return result;
});
exports.UserServices = {
    getUserProfileFromDB,
    updateUserIntoDB,
    getAllUsersFromDB,
    deleteUserFromDB,
    updateRoleFromDB,
};
