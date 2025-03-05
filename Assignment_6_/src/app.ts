import express from "express";
import dotenv from "dotenv";
import { Container } from "inversify";
import { BookController } from "./controller/bookController";
import { BookService } from "./service/bookService";
import BookRoutes from "./routes/bookRoutes";
import { IBookService } from "./interface/bookServiceInterface";
import AdminRoutes from "./routes/adminRoutes";
import { AdminService } from "./service/adminService";
import { IAdminService } from "./interface/adminServiceInterface";
import { AdminController } from "./controller/adminController";
import {IpgService} from "./database/pgInterface";
import {PgService} from "./database/pgService";
import { IUserService } from "./interface/userServiceInterface";
import { UserService } from "./service/userService";
import UserRoutes from "./routes/userRoutes";
import { UserController } from "./controller/UserController";
import { userRegister } from "./controller/register_login";
import { ISignService } from "./interface/signServiceInterface";
import SignRoutes from "./routes/signRoutes";
import { SignService } from "./service/signService";
import { SignController } from "./controller/SignController";
import { authenticatejwt } from "./middleware/auth";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

const container = new Container();

// Bind book-related services and routes
container.bind<IBookService>("IBookService").to(BookService);
container.bind<IpgService>("IpgService").to(PgService);
container.bind<BookController>(BookController).toSelf();
container.bind<BookRoutes>(BookRoutes).toSelf();
const bookRoutes = container.get<BookRoutes>(BookRoutes);

// Bind admin-related services and routes
container.bind<IAdminService>("IAdminService").to(AdminService);
container.bind<AdminController>(AdminController).toSelf();
container.bind<AdminRoutes>(AdminRoutes).toSelf();


// Resolve routes from container
const adminRoutes = container.get<AdminRoutes>(AdminRoutes);

container.bind<IUserService>("IUserService").to(UserService);


container.bind<UserController>(UserController).toSelf();
container.bind<UserRoutes>(UserRoutes).toSelf();

const userRoutes = container.get<UserRoutes>(UserRoutes);

//sign container
container.bind<ISignService>("ISignService").to(SignService);
container.bind<SignController>(SignController).toSelf();
container.bind<SignRoutes>(SignRoutes).toSelf();


const signRoutes=container.get<SignRoutes>(SignRoutes);




// Debug logs to confirm route resolution
console.log("AdminRoutes resolved:", adminRoutes);
console.log("BookRoutes resolved:", bookRoutes);

// Set up routes
app.use("/sign",userRegister);

app.use("/admin", adminRoutes.getRouter());
app.use("/book", bookRoutes.getRouter());
app.use("/user",authenticatejwt("User"), userRoutes.getRouter());
app.use("/sign",signRoutes.getRouter());

app.listen(PORT, () => {
  // sequelize.sync({force:true});
  console.log("Server started at port ", PORT);
});
