import { open as sqliteOpen } from "sqlite";
import sqlite3 from "sqlite3";
import path from 'path'

import { Datastore } from "..";
import { User, Post, Like, Comment } from "../../types";

export class SqlDataStore implements Datastore{

    public async openDb(){
        const db = await sqliteOpen({
            filename:path.join(__dirname,'elqanas.sqlite'),
            driver:sqlite3.Database,
        });

        await db.migrate({
            migrationsPath:path.join(__dirname,'migrations'),
        });

        return this;
    }

    createUser(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getUserByEmail(email: string): Promise<User | undefined> {
        throw new Error("Method not implemented.");
    }
    getUserByUsername(email: string): Promise<User | undefined> {
        throw new Error("Method not implemented.");
    }
    listPosts(): Promise<Post[]> {
        throw new Error("Method not implemented.");
    }
    createPost(post: Post): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getPost(id: string): Promise<Post | undefined> {
        throw new Error("Method not implemented.");
    }
    deletePost(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createLike(like: Like): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createComment(comment: Comment): Promise<void> {
        throw new Error("Method not implemented.");
    }
    listComments(postId: string): Promise<Comment[]> {
        throw new Error("Method not implemented.");
    }
    deleteComment(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}