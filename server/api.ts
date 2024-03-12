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
export type SignUpRequest = Pick<User,'email'|'firstName'|'lastName'|'username'|'password'>;
export interface SignUpResponse {}

export interface SignInRequest{
    login:string
    password:string
}
export type SignInResponse = Pick<User,'email'|'firstName'|'lastName'|'username'|'id'>