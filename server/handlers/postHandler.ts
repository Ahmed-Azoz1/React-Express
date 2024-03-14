import { CreatePostRequest, CreatePostResponse, ListPostRequest, ListPostResponse } from "../api";
import { db } from "../datastore"
import { ExpressHandler, Post } from "../types";
import crypto from 'crypto';



// get(Posts)
export const listPostsHandler:ExpressHandler<ListPostRequest,ListPostResponse> = async(req,res)=>{
    console.log(req.headers.authorization)
    res.send({posts:await db.listPosts()})
}


// 32 line
// interface CreatePostRequest {
//     post:Post;
// }




// post(Posts)
export const createPostsHandler:ExpressHandler<CreatePostRequest,CreatePostResponse> = async (req,res)=>{
    // const post = req.body.post;

    if(!req.body.title || !req.body.url || !req.body.userId){
        return res.sendStatus(400)
    }

    const post:Post = {
        id:crypto.randomUUID(),
        postedAt:Date.now(),
        title:req.body.title,
        url:req.body.url,
        userId:req.body.userId
    };
    await db.createPost(post)
    res.sendStatus(200);
}