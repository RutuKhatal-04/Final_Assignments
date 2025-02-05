
import Book from "./books";
import Author from "./Author";
import User from "./User";
import Payment from "./Payment";
import Review from "./Review";
import Rating from "./Rating";



Author.hasMany(Book,{foreignKey:"authorid"});
Book.belongsTo(Author,{foreignKey:"authorid"});

User.hasMany(Payment,{foreignKey:"userid"});
Payment.belongsTo(User,{foreignKey:"userid"});

Book.hasMany(Payment,{foreignKey:"bookid"});
Payment.belongsTo(Book,{foreignKey:"bookid"});

Book.hasMany(Review,{foreignKey:"bookid"});
Review.belongsTo(Book,{foreignKey:"bookid"});

Book.hasMany(Rating,{foreignKey:"bookid"});
Rating.belongsTo(Book,{foreignKey:"bookid"});