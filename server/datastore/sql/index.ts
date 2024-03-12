import { open as sqliteOpen ,Database} from "sqlite";
import sqlite3 from "sqlite3";
import path from 'path'

import { Datastore } from "..";
import { User, Post, Like, Comment } from "../../types";

export class SqlDataStore implements Datastore{

    private db!: Database<sqlite3.Database,sqlite3.Statement>;

    public async openDb(){
        this.db = await sqliteOpen({
            filename:path.join(__dirname,'elqanas.sqlite'),
            driver:sqlite3.Database,
        });

        this.db.run('PRAGMA foreign_keys = ON;');

        await this.db.migrate({
            migrationsPath:path.join(__dirname,'migrations'),
        });

        return this;
    }

    async createUser(user: User): Promise<void> {
        await this.db.run('INSERT INTO users (id,firstName,lastName,username,email,password) VALUES (?,?,?,?,?,?)',
        user.id.toString(),   
        user.firstName.toString(), 
        user.lastName.toString(), 
        user.username.toString(),
        user.email.toString(),
        user.password.toString()
        )
    }
    getUserByEmail(email: string): Promise<User | undefined> {
        return this.db.get<User>(`SELECT * FROM users WHERE email = ?`,email)
    }
    getUserByUsername(username: string): Promise<User | undefined> {
        return this.db.get<User>(`SELECT * FROM users WHERE username = ?`,username)
    }

    listPosts(): Promise<Post[]> {
        return this.db.all<Post[]>('SELECT * FROM posts')
    }

    async createPost(post: Post): Promise<void> {
        await this.db.run('INSERT INTO posts (id, title, url, userId, postedAt) VALUES (?, ?, ?, ?, ?)',
        post.id,   
        post.title.toString(),  // Convert title to string
        post.url.toString(),    // Convert url to string
        Number(post.userId),    // Assuming userId is a number
        post.postedAt.toString() // Convert postedAt to string
        );
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