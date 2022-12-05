const pool = require('../configs/db')

const getDataRecipe = ({search, limit, offset, sortBy, sortList}) => {
    return new Promise((resolve, reject)=> {
        pool.query(`SELECT * FROM recipes WHERE (name) ILIKE ('%${search}%') ORDER BY ${sortBy} ${sortList} LIMIT ${limit} OFFSET ${offset}`, (err, result)=>{
            if(!err){
                resolve(result)
            }else{
                reject(err)
                console.log(err);
            }
        })
    }) 
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

const countDataRecipe = () =>{
    return pool.query(`SELECT COUNT(*) AS total_recipes FROM recipes`)
}

module.exports = {
    getDataRecipe,
    insertDataRecipe,
    getDetailRecipes,
    deleteDataRecipe,
    countDataRecipe
}