
import Book from "./booksModel";
import Author from "./authorModel";
import User from "./userModel";
import Payment from "./paymentModel";
import Review from "./reviewModel";
import Rating from "./ratingModel";



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