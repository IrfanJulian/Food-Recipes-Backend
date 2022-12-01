const pool = require('../configs/db')

const getDataRecipe = () => {
    return pool.query(`SELECT * FROM recipes`);
}

const getDetailRecipes = (id) => {
    return pool.query(`SELECT recipes.*, users.name AS user FROM users INNER JOIN category ON users.userid = recipes.id WHERE recipes.id='${id}'`)
}

const insertDataRecipe = (data) => {
    const { userID, name, tittle, ingredients, photo } = data
    return pool.query(`INSERT INTO recipes(userID, name, tittle, ingredients, photo)VALUES('${userID}', '${name}', '${tittle}', '${ingredients}', '${photo}')`)
}

const deleteDataRecipe = (id) => {
    return pool.query(`DELETE FROM recipes WHERE id=${id}`)
}

module.exports = {
    getDataRecipe,
    insertDataRecipe,
    getDetailRecipes,
    deleteDataRecipe
}