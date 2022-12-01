CREATE TABLE users(id SERIAL PRIMARY KEY, 
    name VARCHAR, 
    phone VARCHAR, 
    email VARCHAR, 
    password VARCHAR, 
    new_password VARCHAR, 
    photo VARCHAR);

CREATE TABLE recipes(id SERIAL PRIMARY KEY, 
    userID VARCHAR, 
    name VARCHAR, 
    tittle VARCHAR, 
    ingredients VARCHAR, 
    photo VARCHAR, 
    video VARCHAR);

INSERT INTO users(name, phone, email, password, new_password, photo)VALUES('irfan', 8123456789, 'irfan@gmail.com', 'abc123', 'abc123', 'photo1');