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

INSERT INTO recipes(userID, name, tittle, ingredients, photo)VALUES('212', 'steak', 'delicious steak', 'salt garlic black pepper olive oil onion beef', 'photo1')