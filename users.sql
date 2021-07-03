CREATE TABLE users(
    id BIGINT NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(50) NOT NULL,
    phoneNumber BIGINT,
    address VARCHAR(100),
    gender VARCHAR(10),
    verified VARCHAR(5),
    seller VARCHAR(5),
    UNIQUE(email)
);