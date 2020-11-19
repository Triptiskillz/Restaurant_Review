-- for help  /?

-- for list database all \l

-- CREATE DATABASE name_of_database;

-- list of table \d

CREATE TABLE product (
    id INT ,
    name VARCHAR(50),
    price INT,
    on_sale boolean
);

ALTER TABLE product ADD COLUMN fastured boolean; 
ALTER TABLE product DROP COLUMN fastured;

DROP DATABASE table_name;

CREATE TABLE restaurants(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check (price_range >= 1 and price_range <=5)

);
INSERT INTO  restaurants(id,name,location,price_range) VALUES(123,'mcdonalds','new yorks',3);

 select * from restaurants;

CREATE TABLE reviews(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id  BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >=1 and rating <=5)
);