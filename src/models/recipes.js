const pool = require('../configs/db')

const getDataRecipe = ({search, limit, offset, sortBy, sortList}) => {
    return new Promise((resolve, reject)=> {
        pool.query(`SELECT * FROM recipes WHERE (tittle) ILIKE ('%${search}%') ORDER BY ${sortBy} ${sortList} LIMIT ${limit} OFFSET ${offset}`, (err, result)=>{
            if(!err){
                resolve(result)
            }else{
                reject(err)
                console.log(err);
            }
        })
    }) 
}

// const getDetailRecipes = (id) => {
//     return pool.query(`SELECT recipes.*, users.name AS username FROM recipes INNER JOIN users ON recipes.userID=users.id WHERE recipes.id=${id}`)
// }

const getDetailRecipes = (id) => {
    return pool.query(`SELECT * FROM recipes WHERE id=${id}`)
}

const myRecipe = (id) => {
    return pool.query(`SELECT * FROM recipes WHERE userid = '${id}'`)
}

const insertDataRecipe = (data) => {
    const { userid, tittle, ingredients, description, photo } = data
    return pool.query(`INSERT INTO recipes(userid, tittle, ingredients, description, photo)VALUES('${userid}', '${tittle}', '${ingredients}', '${description}', '${photo}')`)
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
    myRecipe,
    countDataRecipe
}