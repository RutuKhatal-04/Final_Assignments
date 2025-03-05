import { inject, injectable } from "inversify";
import { IUserService } from "../interface/userServiceInterface";
import { IpgService } from "../database/pgInterface";
import { ResponseDtos } from "../dtos/responseDtos";
import { ReviewDtos } from "../dtos/reviewDtos";
import Review from "../models/reviewModel";
import { RatingDtos } from "../dtos/ratingDtos";
import Rating from "../models/ratingModel";

@injectable()
export class UserService implements IUserService {
  private pgservice: IpgService;
  constructor(@inject("IpgService") pgservice: IpgService) {
    this.pgservice = pgservice;
  }
  async getUserData(userid: number): Promise<ResponseDtos> {
    try {
      const data = await this.pgservice.getUserData(userid);
      return {
        success: true,
        message: "User Data",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to fetch user data",
        data: error,
      };
    }
  }
  async addReview(
    userid: number,
    id: number,
    reviewDto: ReviewDtos
  ): Promise<ResponseDtos> {
    try {
      let review = new Review();
      review.userid = reviewDto.userid;
      review.bookid = reviewDto.bookid;
      review.content = reviewDto.content;
      const data = await this.pgservice.addReview(userid, id, review);

      return {
        success: true,
        message: "Review Added",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to add review data",
        data: error,
      };
    }
  }

  async getReview(id: number): Promise<ResponseDtos> {
    try {
      const data = await this.pgservice.getReview(id);
      if (!data) {
        return {
          success: false,
          message: "No review for this book id",
          data: " ",
        };
      }
      return {
        success: true,
        message: "Review data for given bookid",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to fetch author data",
        data: error,
      };
    }
  }

  async deleteReview(id: number): Promise<ResponseDtos> {
    try {
      const data = await this.pgservice.deleteReview(id);
      return {
        success: true,
        message: "Review deleted",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to delete review data",
        data: error,
      };
    }
  }

  async addRating(
    userid: number,
    id: number,
    ratingDto: RatingDtos
  ): Promise<ResponseDtos> {
    try {
      let rating = new Rating();
      rating.userid = ratingDto.userid;
      rating.bookid = ratingDto.bookid;
      rating.rating = ratingDto.rating;
      const data = await this.pgservice.addRating(userid, id, rating);
      return {
        success: true,
        message: "Rating added for bookid",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to add rating data",
        data: error,
      };
    }
  }

  async getRating(id: number): Promise<ResponseDtos> {
    try {
      const data = await this.pgservice.getRating(id);
      if (!data) {
        return {
          success: false,
          message: "No data found",
          data: "",
        };
      }
      return {
        success: true,
        message: "Rating data for given bookid",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to fetch rating data",
        data: error,
      };
    }
  }
}
