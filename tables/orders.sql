CREATE TABLE orders (
    productId BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL, 
    price VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    date VARCHAR(10) NOT NULL,
    useremail VARCHAR(100) NOT NULL
);

INSERT INTO orders (productId, name, price, category, date, useremail) VALUES ('1', 'MSI GE66 Raider', '2,23,990', 'laptop', '11/12/21', 'tiwarivarun819.vt33.vt@gmail.com');
INSERT INTO orders (productId, name, price, category, date, useremail) VALUES ('2', 'Samsung Galaxy M32', '14,999', 'smartphone', '11/12/21', 'tiwarivarun819.vt33.vt@gmail.com');
INSERT INTO orders (productId, name, price, category, date, useremail) VALUES ('3', 'SanDisk Cruzer Blade 32GB USB Flash Drive', '419', 'storage', '11/12/21', 'tiwarivarun819.vt33.vt@gmail.com');

