import { ReviewDtos } from "../dtos/reviewDtos";
import { RatingDtos } from "../dtos/ratingDtos";
import { ResponseDtos } from "../dtos/responseDtos";


export interface IUserService{
    getUserData(userid:number):Promise<ResponseDtos>;
    addReview(userid:number,id:number,review:ReviewDtos):Promise<ResponseDtos>;
    getReview(id:number):Promise<ResponseDtos>;
    deleteReview(id:number):Promise<ResponseDtos>;
    addRating(userid:number,id:number,rating:RatingDtos):Promise<ResponseDtos>;
    getRating(id:number):Promise<ResponseDtos>;
}