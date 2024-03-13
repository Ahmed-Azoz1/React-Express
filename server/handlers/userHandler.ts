import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from "../api";
import { db } from "../datastore";
import { ExpressHandler, User } from "../types";
import crypto from 'crypto'

export const signUpHandler:ExpressHandler<SignUpRequest,SignUpResponse> = async (req,res)=>{
    const {email,firstName,lastName,password,userName} = req.body;
    if(!email || !firstName || !lastName || !password || !userName){
        return res.status(400).send('All fields are required');
    }

    const existing = await db.getUserByEmail(email) || await db.getUserByUsername(userName);
    if(existing){
        return res.status(403).send('User already exists')
    }

    const user:User={
        id:crypto.randomUUID(),
        email,firstName,lastName,userName,password
    }
    await db.createUser(user);
    return res.sendStatus(200)
};

export const signInHandler:ExpressHandler<SignInRequest,SignInResponse> = async(req,res)=>{
    const {login,password} = req.body;
    if(!login || !password ){
        return res.sendStatus(400);
    }
    const existing = (await db.getUserByEmail(login)) || (await db.getUserByUsername(login));
    if(!existing || existing.password !== password){
        return res.sendStatus(403);
    }

    return res.status(200).send({
        id:existing.id,
        email:existing.email,
        firstName:existing.firstName,
        lastName:existing.lastName,
        userName:existing.userName
    })
}