import { ExpressHandler } from "../types";

export const authMiddleware:ExpressHandler<any,any> = (req,res,next)=>{
    const authHeader = req.headers.authorization;
}