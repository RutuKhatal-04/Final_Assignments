"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const inversify_1 = require("inversify");
const bookController_1 = require("./controller/bookController");
const bookService_1 = require("./service/bookService");
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const adminService_1 = require("./service/adminService");
const adminController_1 = require("./controller/adminController");
const pgService_1 = require("./database/pgService");
const userService_1 = require("./service/userService");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const UserController_1 = require("./controller/UserController");
const register_login_1 = require("./controller/register_login");
const signRoutes_1 = __importDefault(require("./routes/signRoutes"));
const signService_1 = require("./service/signService");
const SignController_1 = require("./controller/SignController");
const auth_1 = require("./middleware/auth");
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
const container = new inversify_1.Container();
// Bind book-related services and routes
container.bind("IBookService").to(bookService_1.BookService);
container.bind("IpgService").to(pgService_1.PgService);
container.bind(bookController_1.BookController).toSelf();
container.bind(bookRoutes_1.default).toSelf();
const bookRoutes = container.get(bookRoutes_1.default);
// Bind admin-related services and routes
container.bind("IAdminService").to(adminService_1.AdminService);
container.bind(adminController_1.AdminController).toSelf();
container.bind(adminRoutes_1.default).toSelf();
// Resolve routes from container
const adminRoutes = container.get(adminRoutes_1.default);
container.bind("IUserService").to(userService_1.UserService);
container.bind(UserController_1.UserController).toSelf();
container.bind(userRoutes_1.default).toSelf();
const userRoutes = container.get(userRoutes_1.default);
//sign container
container.bind("ISignService").to(signService_1.SignService);
container.bind(SignController_1.SignController).toSelf();
container.bind(signRoutes_1.default).toSelf();
const signRoutes = container.get(signRoutes_1.default);
// Debug logs to confirm route resolution
console.log("AdminRoutes resolved:", adminRoutes);
console.log("BookRoutes resolved:", bookRoutes);
// Set up routes
app.use("/sign", register_login_1.userRegister);
app.use("/admin", adminRoutes.getRouter());
app.use("/book", bookRoutes.getRouter());
app.use("/user", (0, auth_1.authenticatejwt)("User"), userRoutes.getRouter());
app.use("/sign", signRoutes.getRouter());
app.listen(PORT, () => {
    // sequelize.sync({force:true});
    console.log("Server started at port ", PORT);
});
//# sourceMappingURL=app.js.map