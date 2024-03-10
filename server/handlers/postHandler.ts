import { CreatePostRequest, CreatePostResponse, ListPostRequest, ListPostResponse } from "../api";
import { db } from "../datastore"
import { ExpressHandler, Post } from "../types";
import crypto from 'crypto';



// get(Posts)
export const listPostsHandler:ExpressHandler<ListPostRequest,ListPostResponse> = (req,res)=>{
    res.send({posts:db.listPosts()})
}


// 32 line
// interface CreatePostRequest {
//     post:Post;
// }




// post(Posts)
export const createPostsHandler:ExpressHandler<CreatePostRequest,CreatePostResponse> = (req,res)=>{
    // const post = req.body.post;

    if(!req.body.title){
        return res.status(400).send('Title field is required,but missing')
    }

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
    db.createPost(post)
    res.sendStatus(200)
}