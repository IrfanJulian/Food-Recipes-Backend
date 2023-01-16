CREATE TABLE users(id VARCHAR PRIMARY KEY, 
    name VARCHAR, 
    phone VARCHAR, 
    email VARCHAR, 
    password VARCHAR,
    photo VARCHAR NULL);

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

INSERT INTO users(id, name, phone, email, password, new_password)VALUES('ba123saf456', 'Bambamss', '08123456789', 'bambams@gmail.com', 'abc123', 'abc123');

INSERT INTO recipes(userID, tittle, ingredients, photo)VALUES('212', 'delicious steak', 'salt garlic black pepper olive oil onion beef', 'photo1')

CREATE TABLE users(id TEXT PRIMARY KEY, name TEXT, phone TEXT, email TEXT, password TEXT, photo TEXT DEFAULT '');

CREATE TABLE recipes(id SERIAL PRIMARY KEY, tittle TEXT, ingredients TEXT, description TEXT, phone TEXT, photo TEXT, userid TEXT);