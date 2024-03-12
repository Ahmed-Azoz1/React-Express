import { SignUpRequest, SignUpResponse } from "../api";
import { db } from "../datastore";
import { ExpressHandler, User } from "../types";
import crypto from 'crypto'

export const signUpHandler:ExpressHandler<SignUpRequest,SignUpResponse> = async (req,res)=>{
    const {email,firstName,lastName,password,username} = req.body;
    if(!email || !firstName || !lastName || !password || !username){
        return res.status(400).send('All fields are required');
    }

    const existing = await db.getUserByEmail(email) || await db.getUserByUsername(username);
    if(existing){
        return res.status(403).send('User already exists')
    }

    const user:User={
        id:crypto.randomUUID(),
        email,firstName,lastName,username,password
    }
    await db.createUser(user);
    return res.sendStatus(200)
};