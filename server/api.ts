import { Post, User } from "./types";

//  Post api
export interface ListPostRequest {}
export interface ListPostResponse {
    posts:Post[];
}


export type CreatePostRequest = Pick<Post,'title'|'url'|'userId'>;
export interface CreatePostResponse{}

export interface GetPostRequest{}
export interface GetPostResponse {
    post:Post;
}


// Comment APi



// User Api
export type SignUpRequest = Pick<User,'email'|'firstName'|'lastName'|'userName'|'password'>;
export interface SignUpResponse {
    jwt:string
}

export interface SignInRequest{
    login:string
    password:string
}
export type SignInResponse = {
    user: Pick<User,'email'|'firstName'|'lastName'|'userName'|'id'>;
    jwt:string;
}