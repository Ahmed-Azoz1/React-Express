CREATE TABLE users(
    id INTEGER PRIMARY KEY,
	first_name VARCHAR NOT NULL,
	last_name VARCHAR NOT NULL,
    userName   VARCHAR UNIQUE NOT NULL,
	email VARCHAR NOT NULL UNIQUE,
	password VARCHAR NOT NULL 
);



CREATE TABLE posts (
    id        INTEGER PRIMARY KEY,
    title     VARCHAR NOT NULL,
    url       VARCHAR UNIQUE NOT NULL,
    userId    INTEGER NOT NULL,
    postedAt  INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (id)
);