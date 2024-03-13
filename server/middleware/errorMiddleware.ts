import { ErrorRequestHandler } from "express"

export const errorHandler:ErrorRequestHandler = (err,req,res,next)=>{
    console.log('Uncaught exception : ',err)
    return res.status(500).send('Oop, an unexpected error occurred,please try again')
}