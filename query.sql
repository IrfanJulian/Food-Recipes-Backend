CREATE TABLE users(id VARCHAR PRIMARY KEY, 
    name VARCHAR, 
    phone VARCHAR, 
    email VARCHAR, 
    password VARCHAR, 
    new_password VARCHAR, 
    photo VARCHAR);

-- CREATE TABLE recipes(id SERIAL PRIMARY KEY, 
--     userID VARCHAR, 
--     name VARCHAR, 
--     tittle VARCHAR, 
--     ingredients VARCHAR, 
--     photo VARCHAR, 
--     video VARCHAR);

CREATE TABLE recipes(id SERIAL PRIMARY KEY, 
    userID VARCHAR,
    tittle VARCHAR, 
    ingredients VARCHAR, 
    photo VARCHAR);

INSERT INTO users(name, phone, email, password, new_password, photo)VALUES('irfan', 8123456789, 'irfan@gmail.com', 'abc123', 'abc123', 'photo1');

INSERT INTO recipes(userID, name, tittle, ingredients, photo)VALUES('212', 'steak', 'delicious steak', 'salt garlic black pepper olive oil onion beef', 'photo1')