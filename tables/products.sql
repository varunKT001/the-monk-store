CREATE TABLE products (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL, 
    price VARCHAR(50) NOT NULL,
    category VARCHAR(20) NOT NULL, 
    description VARCHAR(300) NOT NULL,
    seller VARCHAR(100)
);

INSERT INTO products (name, price, category, description) VALUES ('MSI GE66 Raider', '2,23,990', 'laptop', 'Display size 15.60-inch , Display resolution 2560x1440 pixels , Core i7 11th gen , Windows 10 home , 16 GB RAM , 1TB SSD , 1 TB HDD , Nvidia 8 GB graphics.' );
INSERT INTO products (name, price, category, description) VALUES ('Asus TUF Gaming', '92,990', 'laptop', '17.30 inch display , i5 11th gen , Windows 10 Professional , Nvdia Geforce 4 GB , RAM 8GB , 512GB SSD , 1 TB HDD.' );
INSERT INTO products (name, price, category, description) VALUES ('Dell Latitude', '1,45,000', 'laptop', '15.00 inch IPS display , 256 GB SSD ,16 GB , 2 TB HDD , Integrated Iris Xe , i5 core 11th gen , Windows 10 Professional' );
INSERT INTO products (name, price, category, description) VALUES ('Asus ROG Flow', '1,19,000', 'laptop', '13.40 inch IPS antiglare display , AMD Ryzen 7 , Windows 10 professional , Nvidia GeForce 8 GB , 16 GB RAM , 1 TB SSD , 1 TB HDD' );
INSERT INTO products (name, price, category, description) VALUES ('HP Chromebook 11a', '21,999', 'laptop', '11.60 inch Dispaly , Chrome OS , 64GB SSD ,  4 GB RAM , core i3 9th gen' );
INSERT INTO products (name, price, category, description) VALUES ('Asus VivioBook 15', '', 'laptop', '15.6 inch Display , Ryzen 5 , 512 GB SSD , Windows 10 Home , dedicated graphics slot , i3 11th gen' );
INSERT INTO products (name, price, category, description) VALUES ('Lenovo Yoga 6', '86,990', 'laptop', '13.30 inch Display , Windows 10 Home , Intel Integrated Graphics 2GB , 1TB SSD , 8 GB RAM' );
INSERT INTO products (name, price, category, description) VALUES ('HP Pavilion 15', '69,999', 'laptop', '15.60 inch display , i5 11th gen , 512 GB SSD , 1 TB HDD , Nvidia GeForce 2GB , Windows 10 Home' );
INSERT INTO products (name, price, category, description) VALUES ('Mi NoteBook 14', '44,999', 'laptop', '14.00 inch IPS Display , Core i5 10th gen , 8GB RAM , 512 GB SSD , Windows 10 Home , 1920x1080 pixels' );
INSERT INTO products (name, price, category, description) VALUES ('Vaio E15', '49,990', 'laptop', '15.60 inch IPS antiglare 1920x1080 pixels , Ryzen 5 , Windows 10 Home , AMD Radeon Vega 8 , 6 GB RAM , 1 TB HDD , with Number Keypad' );
INSERT INTO products (name, price, category, description) VALUES ('Lenovo Legion 5', '74,999', 'laptop', '10th Gen Intel Core i5 15.6 inch (39.62 cms) Full HD IPS Gaming Laptop (8GB/1TB HDD + 256GB SSD/Windows 10/120 Hz/NVIDIA GTX 1650Ti 4GB GDDR6 Graphics/Phantom Black/2.3Kg)' );
INSERT INTO products (name, price, category, description) VALUES ('AVITA Essential Refresh', '20,000', 'laptop', 'NE14A2INC43A-MB 14-inch/35.56 cm(Intel Celeron-N4020/4GB/128GB SSD/Windows 10 Home/FHD/Integrated Graphics), Matt Black' );

INSERT INTO products (name, price, category, description) VALUES ('Samsung Galaxy M32', '14,999', 'smartphone', 'Segment Best FHD+ sAMOLED, 800 Nits for high brightness , 6000mAh battery , 16.21cm (6.4”) Infinity-U Display , 64MP Quad Cam , 20MP Front Camera , 6 GB RAM , 128GB ROM' );
INSERT INTO products (name, price, category, description) VALUES ('OnePlus Nord', '22,999', 'smartphone', 'Qualcomm Snapdragon 750G , 8 GB RAM , 256 GB internal storage , 4500 mAh battery , Dual, Nano-Nano SIM , Triple (64 8 2) MP Rear, 16 MP Front Camera , 6.43 inches FHD Screen');
INSERT INTO products (name, price, category, description) VALUES ('Xiaomi 11', '21,999', 'smartphone', 'Qualcomm Snapdragon 732G , 6 GB RAM , 128 GB internal storage , 6.55 inches (16.64 cm) Screen , 4250 mAh battery , Android v11 , Dual, Nano-Hybrid SIM');
INSERT INTO products (name, price, category, description) VALUES ('Mi Note 10', '15,999', 'smartphone', 'Qualcomm Snapdragon 732G , 6 GB RAM , 64 GB internal storage , 5020 mAh battery , 6.43 inches (16.33 cm) Screen , Quad (48 8 2 2) MP Rear, 13 MP Front Camera , Dual, Nano-Nano SIM , Android v11');
INSERT INTO products (name, price, category, description) VALUES ('Vivo iQoo Z3', '19,990', 'smartphone', 'Qualcomm Snapdragon 768G , Triple (64 8 2) MP Rear, 16 MP Front Camera , 6 GB RAM , 128 GB internal storage , 4400 mAh battery , 6.58 inches (16.71 cm) Screen , Dual, Nano-Hybrid SIM , Android v11');
INSERT INTO products (name, price, category, description) VALUES ('Realme 8 pro', '17,999', 'smartphone', 'Qualcomm Snapdragon 720G , Quad (108 8 2 2) MP Rear, 16 MP Front Camera , 6 GB RAM , 128 GB internal storage , 4500 mAh battery , Quad (108 8 2 2) MP Rear, 16 MP Front Camera rear, 6.4 inches (16.26 cm) Screen , Dual, Nano-Nano SIM , Android v11');
INSERT INTO products (name, price, category, description) VALUES ('Samsung Galaxy F12', '9,999', 'smartphone', 'Samsung Exynos 8nm Octa 850 , 4 GB RAM , 64 GB internal storage , 6000 mAh battery , Quad (48 5 2 2) MP Rear, 8 MP Front Camera , 6.5 inches (16.55 cm) Screen , Dual, Nano-Nano SIM , Android v11');
INSERT INTO products (name, price, category, description) VALUES ('Poco M3', '10,999', 'smartphone', 'Qualcomm Snapdragon 662 , 6 GB RAM , 64 GB internal storage , 6000 mAh battery , Triple (48 2 2) MP Rear, 8 MP Front Camera , 6.53 inches (16.59 cm) Screen , Dual, Nano-Nano SIM, Android v10 (Q)');
INSERT INTO products (name, price, category, description) VALUES ('Poco X3 Pro', '18,999', 'smartphone', 'Qualcomm Snapdragon 860 , 6 GB RAM , 128 GB internal storage , 5160 mAh battery , Quad (48 8 2 2) MP Rear, 20 MP Front Camera , 6.67 inches (16.94 cm) Screen , Dual, Nano-Hybrid SIM , Android v11');
INSERT INTO products (name, price, category, description) VALUES ('New Apple iPhone 11', '51,999', 'smartphone', '6.1-inch (15.5 cm diagonal) Liquid Retina HD LCD display , Dual-camera system with 12MP Ultra Wide and Wide cameras; RAM 8 GB , 128GB ROM');
INSERT INTO products (name, price, category, description) VALUES ('Redmi Note 10S', '15,999', 'smartphone', '6GB RAM, 128GB Storage - Super Amoled Display , 64 MP Quad Camera ,  5000 mAh large battery , Item Weight 179 g');

INSERT INTO products (name, price, category, description) VALUES ('SanDisk Cruzer Blade 32GB USB Flash Drive', '419', 'storage', 'Password-protect your sensitive files' );
INSERT INTO products (name, price, category, description) VALUES ('HP FD236W 32GB USB 2.0 Pen Drive (Gray)', '425', 'storage', 'Electronic plating after printing technic (Anti-fake). Opening Mechanism : Capless. Read Speed : 14. Write Speed : 5' );
INSERT INTO products (name, price, category, description) VALUES ('SanDisk SDDD3', '549', 'storage', '032G-I35GW Ultra Dual 32GB USB 3.0 OTG Pen Drive (Gold)' );
INSERT INTO products (name, price, category, description) VALUES ('UPVsales Professional CD-R as 52X 700MB 80 Minutes - Pack of 10', '319', 'storage', 'Record Everything (Data | Video | Photo | Music)' );
INSERT INTO products (name, price, category, description) VALUES ('Seagate Backup Plus Slim 2 TB External HDD', '5,499', 'storage', ' USB 3.0 for Windows and Mac, 3 yr Data Recovery Services, Portable Hard Drive – Light Blue with 4 Months Adobe CC Photography' );
INSERT INTO products (name, price, category, description) VALUES ('Toshiba Canvio Basics 1TB Portable External HDD', '3,799', 'storage', ' USB 3.0 for PC Laptop Windows and Mac, 3 Years Warranty, External Hard Drive - Black' );
INSERT INTO products (name, price, category, description) VALUES ('Crucial P1 1TB 3D NAND NVMe PCIe M.2 SSD - CT1000P1SSD8', '10,999', 'storage', '' );
INSERT INTO products (name, price, category, description) VALUES ('Seagate Barracuda Q1 SSD 240GB', 'Seagate Barracuda Q1 SSD 240GB', 'storage', 'Internal Solid State Drive – 2.5 Inch SATA 6Gb/s for PC Laptop Upgrade 3D QLC NAND' );
INSERT INTO products (name, price, category, description) VALUES ('Samsung EVO Plus 64GB microSD', '649', 'storage', 'XC UHS-I 100MB/s Full HD & 4K UHD Memory Card with Adapter' );
INSERT INTO products (name, price, category, description) VALUES ('Samsung EVO Plus 128GB microSD', '1,299', 'storage', 'XC UHS-I U3 100MB/s Full HD & 4K UHD Memory Card with Adapter' );
INSERT INTO products (name, price, category, description) VALUES ('Generic Durable USB 2.0 External 1.44 MB 3.5 inch Floppy Disk Drive', '1,350', 'storage', '' );
INSERT INTO products (name, price, category, description) VALUES ('Verbatim CD-R Blank Disc 52x 700MB (Pack of 50 CDs) (Shrink Warp Packing)', '944', 'storage', '' );
