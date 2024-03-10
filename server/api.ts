import { Post } from "./types";

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