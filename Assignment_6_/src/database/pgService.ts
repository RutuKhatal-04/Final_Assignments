import { IpgService } from "./pgInterface";
import Book from "../models/booksModel";
import User from "../models/userModel";
import Author from "../models/authorModel"; 
import Review from "../models/reviewModel";
import Rating from "../models/ratingModel";
import { BookDtos } from "../dtos/bookDtos";
import { filterDtos } from "../dtos/filterDtos";

export class PgService implements IpgService {
  public async findBookByUuid(uId: string): Promise<Book | null> {
    return await Book.findOne({
      where: { uId: uId, active: true, archive: false },
    });
  }

  public async createBook(bookData: Book): Promise<Book> {
    const book = await Book.create(bookData.get({ plain: true }));
    return book;
  }

  public async updateBook(uuid: string, updatedData: Book): Promise<Book | null> {
    const [affectedCount] = await Book.update(updatedData, { where: { uId: uuid } });

    if (affectedCount === 0) {
        return null; }


    const newBook = await Book.findOne({ where: { uId: uuid } });
    return newBook;
}


  public async booklist(limit: number, offset: number,requestBody:string[]): Promise<Book[]> {
    const data = await Book.findAll({
      attributes:requestBody,
      limit: limit,
      offset: offset,
      order: [["id", "ASC"]]
      
     
    });
    return data;
  }

  public async filterdata(limit: number, offset: number, filterDto:filterDtos): Promise<Book[]> {
    try {
        const data = await Book.findAll({
            where: filterDto.filter,  
            attributes:filterDto.columns,
            limit: limit,
            offset: offset,
            order: [["id", filterDto.sort]],
        });
        // const books = await Book.findAll({
        //   where: {
        //     title: "Flowers for Algernon",
        //     authors: "Daniel Keyes",
        //   },
        // });
        
        return data;
    } catch (error) {
        console.error("Error fetching book list:", error);
        throw error;
    }
}

  
  public async extractAndInsertAuthors(): Promise<any> {
    try {
      const books = await Book.findAll();
      const authorsSet = new Set<string>();
      books.forEach((book) => {
        console.log(`Processing book: ${book.title}`);
        const authors = (book.authors as unknown as string).split(","); // Assuming authors are stored as a comma-separated string
        authors.forEach(async (author: string) => {
          const trimmedAuthor = author.trim();
          console.log(`Extracted author: ${trimmedAuthor}`);
          authorsSet.add(trimmedAuthor);
          const data = await Author.create({
            name: trimmedAuthor,
          });
        });
      });

      // Convert the Set to an array before sending it in the response
      const authorsArray = Array.from(authorsSet);

      console.log("Authors have been successfully extracted ");
      return authorsArray;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  public async getauthor(): Promise<Author[]> {
    const data = await Author.findAll();
      return data

  }
  public async getauthordata(id: number): Promise<Author|null> {
    const data = await Author.findByPk(id);
    if (!data) {
      return null;
    }
    return data;
  }

  public async addauthor(authordata: Author): Promise<Author> {
    const newdata = await Author.create(authordata.get({ plain: true }));

    return newdata;
  }

  public async deleteauthor(author: Author): Promise<any> {
    return await author.destroy();
  }


  public async getUserData(id: number): Promise<User|null> {
    const data = await User.findByPk(id);
    return data;
  }

  public async addReview(userid: number, id: number, review: Review ): Promise<Review> {
    const data = await Review.create({ userid, bookid: id, content: review });
    return data;
  }

  public async getReview(id: number): Promise<Review[]> {
    const data = await Review.findAll({
      where: {
        bookid: id,
      },
    });
    return data;
  }

  public async deleteReview(id: number): Promise<Review|null> {
    const data = await Review.findByPk(id);
    if(!data){
      return null
    }
    await data.destroy();
    return data

      
  }
  public async addRating( userid: number, id: number, rating: Rating ): Promise<Rating> {
    const data = await Rating.create({
      userid,
      id,
      rating,
    });
    return data;
  }
  public async getRating(id: number): Promise<Rating[]> {
    const data = await Rating.findAll({
      where: {
        bookid: id,
      },
    });

    return data;
  
}


  public async userRegister(userdata:User):Promise<User>{
    const newdata= await User.create(userdata.get({plain:true}));
    return newdata
  }

  public async userLogin(email:string):Promise<User|null>{
    const userdata=await User.findOne({where:{email:email}});
    if(!userdata){
      return null
    }
    return userdata;
  }
}