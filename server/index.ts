import express, { ErrorRequestHandler, RequestHandler } from 'express';
import { createPostsHandler, listPostsHandler } from './handlers/postHandler';
const app = express();


app.use(express.json())

const requestLoggerMiddleware: RequestHandler = (req,res,next)=>{
    console.log(req.method,req.path,'body :' ,req.body)
    next()
}

app.use(requestLoggerMiddleware)

app.get('/v1/posts',listPostsHandler)

app.post('/v1/posts',createPostsHandler)

const errorHandler:ErrorRequestHandler = (err,req,res,next)=>{
    console.log('Uncaught exception : ',err)
    return res.status(500).send('Oop, an unexpected error occurred,please try again')
}

app.use(errorHandler);

app.listen(3000);
