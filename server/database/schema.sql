create table user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  password varchar(255) not null
);

CREATE TABLE product (
    idproduct INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(45) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),  -- Optionnel
    type VARCHAR(45) NOT NULL
);

CREATE TABLE category (
    idcategory INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE product_category (
    idproduct INT,
    idcategory INT,
    PRIMARY KEY (idproduct, idcategory),
    FOREIGN KEY (idproduct) REFERENCES product(idproduct) ON DELETE CASCADE,
    FOREIGN KEY (idcategory) REFERENCES category(idcategory) ON DELETE CASCADE
);


insert into user(id, email, password)
values
  (1, "jdoe@mail.com", "123456");

INSERT INTO product (name, brand, price, image, type) VALUES
('Stratocaster', 'Fender', 1299.99, 'stratocaster.jpg', 'Électrique'),
('Telecaster', 'Fender', 1199.99, 'telecaster.jpg', 'Électrique'),
('Les Paul Standard', 'Gibson', 2499.99, 'les_paul_standard.jpg', 'Électrique'),
('SG Standard', 'Gibson', 1799.99, 'sg_standard.jpg', 'Électrique'),
('SE Custom 24', 'PRS', 999.99, 'se_custom_24.jpg', 'Électrique'),
('D-28', 'Martin', 2999.99, 'd28.jpg', 'Acoustique'),
('J-45 Standard', 'Gibson', 2799.99, 'j45_standard.jpg', 'Acoustique'),
('Pacifica 112V', 'Yamaha', 399.99, 'pacifica_112v.jpg', 'Électrique');

INSERT INTO `guitar_sell`.`category` (`idcategory`, `name`) VALUES ('1', 'Guitar');
INSERT INTO `guitar_sell`.`category` (`idcategory`, `name`) VALUES ('2', 'Basse');

UPDATE `guitar_sell`.`product` SET `image` = 'http://localhost:3310/assets/images/electric-guitar.png' WHERE (`idproduct` = '1');
UPDATE `guitar_sell`.`product` SET `image` = 'http://localhost:3310/assets/images/electric-guitar.png' WHERE (`idproduct` = '2');
UPDATE `guitar_sell`.`product` SET `image` = 'http://localhost:3310/assets/images/electric-guitar.png' WHERE (`idproduct` = '3');
UPDATE `guitar_sell`.`product` SET `image` = 'http://localhost:3310/assets/images/electric-guitar.png' WHERE (`idproduct` = '4');
UPDATE `guitar_sell`.`product` SET `image` = 'http://localhost:3310/assets/images/electric-guitar.png' WHERE (`idproduct` = '5');
UPDATE `guitar_sell`.`product` SET `image` = 'http://localhost:3310/assets/images/acoustic-guitar.png' WHERE (`idproduct` = '6');
UPDATE `guitar_sell`.`product` SET `image` = 'http://localhost:3310/assets/images/acoustic-guitar.png' WHERE (`idproduct` = '7');
UPDATE `guitar_sell`.`product` SET `image` = 'http://localhost:3310/assets/images/electric-guitar.png' WHERE (`idproduct` = '8');

INSERT INTO product_category (idproduct, idcategory) 
SELECT idproduct, 1 FROM product WHERE type = 'Électrique';

INSERT INTO product_category (idproduct, idcategory) 
SELECT idproduct, 1 FROM product WHERE type = 'Acoustique';
