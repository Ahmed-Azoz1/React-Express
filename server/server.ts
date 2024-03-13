import express from 'express';
import { createPostsHandler, listPostsHandler } from './handlers/postHandler';
import asyncHandler from 'express-async-handler';
import { initDb } from './datastore';
import { signInHandler, signUpHandler } from './handlers/authHandler';
import { requestLoggerMiddleware } from './middleware/loggerMiddleware';
import { errorHandler } from './middleware/errorMiddleware';


(async ()=>{
    await initDb();
    const app = express();

    app.use(express.json());

    
    // Ues MiddleWare
    app.use(requestLoggerMiddleware)

    app.get('/v1/posts',asyncHandler(listPostsHandler))
    app.post('/v1/posts',asyncHandler(createPostsHandler))

    app.post('/v1/signup',asyncHandler(signUpHandler))
    app.post('/v1/signin',asyncHandler(signInHandler))

    
    // Use MiddleWare
    app.use(errorHandler);

    app.listen(3000);

})();

