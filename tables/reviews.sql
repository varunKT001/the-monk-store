CREATE TABLE reviews (
    productId BIGINT NOT NULL,
    username VARCHAR(100) NOT NULL, 
    date VARCHAR(10) NOT NULL,
    review TEXT NOT NULL
);

INSERT INTO reviews (productId, username, date, review) VALUES ('1', 'varun', '12/07/2021', 'very good');