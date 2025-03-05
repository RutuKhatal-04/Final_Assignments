"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const booksModel_1 = __importDefault(require("./booksModel"));
const authorModel_1 = __importDefault(require("./authorModel"));
const userModel_1 = __importDefault(require("./userModel"));
const paymentModel_1 = __importDefault(require("./paymentModel"));
const reviewModel_1 = __importDefault(require("./reviewModel"));
const ratingModel_1 = __importDefault(require("./ratingModel"));
authorModel_1.default.hasMany(booksModel_1.default, { foreignKey: "authorid" });
booksModel_1.default.belongsTo(authorModel_1.default, { foreignKey: "authorid" });
userModel_1.default.hasMany(paymentModel_1.default, { foreignKey: "userid" });
paymentModel_1.default.belongsTo(userModel_1.default, { foreignKey: "userid" });
booksModel_1.default.hasMany(paymentModel_1.default, { foreignKey: "bookid" });
paymentModel_1.default.belongsTo(booksModel_1.default, { foreignKey: "bookid" });
booksModel_1.default.hasMany(reviewModel_1.default, { foreignKey: "bookid" });
reviewModel_1.default.belongsTo(booksModel_1.default, { foreignKey: "bookid" });
booksModel_1.default.hasMany(ratingModel_1.default, { foreignKey: "bookid" });
ratingModel_1.default.belongsTo(booksModel_1.default, { foreignKey: "bookid" });
//# sourceMappingURL=association.js.map