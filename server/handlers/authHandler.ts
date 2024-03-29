import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from "../api";
import { signJwt } from "../auth";
import { db } from "../datastore";
import { ExpressHandler, User } from "../types";
import crypto from 'crypto'

export const signUpHandler:ExpressHandler<SignUpRequest,SignUpResponse> = async (req,res)=>{
    const {email,firstName,lastName,password,userName} = req.body;
    if(!email || !firstName || !lastName || !password || !userName){
        return res.status(400).send({error:'All fields are required'});
    }

    const existing = await db.getUserByEmail(email) || await db.getUserByUsername(userName);
    if(existing){
        return res.status(403).send({error:'User already exists'})
    }

    const user:User={
        id:crypto.randomUUID(),
        email,firstName,lastName,userName,password:hashPassword(password)
    }
    await db.createUser(user);
    const jwt = signJwt({userId:user.id});
    return res.status(200).send({jwt})
};

export const signInHandler:ExpressHandler<SignInRequest,SignInResponse> = async(req,res)=>{
    const {login,password} = req.body;
    if(!login || !password ){
        return res.sendStatus(400);
    }

    
    const existing = (await db.getUserByEmail(login)) || (await db.getUserByUsername(login));
    if(!existing || existing.password !== hashPassword(password)){
        return res.sendStatus(403);
    }

    const jwt = signJwt({userId:existing.id});

    return res.status(200).send({
        user:{
            id:existing.id,
            email:existing.email,
            firstName:existing.firstName,
            lastName:existing.lastName,
            userName:existing.userName
        },
        jwt,
    })
}


function hashPassword(password:string):string{
    // Hash password
    return crypto.pbkdf2Sync(password,process.env.PASSWORD_SALT!,42,64,'sha512').toString('hex')
    

}