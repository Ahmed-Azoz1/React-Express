export interface User {
    id:string;
    fristName:string;
    lastName:string;
    username:string;
    email:string;
    password:string;
}

export interface Post{
    id:string;
    title:string;
    url:string;
    userId:string;
    postedAt:number;
}

export interface Like {
    userId:string;
    PostId:string;
}

export interface Comment {
    id:string;
    userId:string;
    postId:string;
    comment:string;
    postedAt:number;
}
