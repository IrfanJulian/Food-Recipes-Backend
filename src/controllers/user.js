/* eslint-disable no-undef */
const { response } = require('../helpers/common')
const userModels = require('../models/user')
const cloudinary = require('cloudinary').v2
const bcrypt = require('bcryptjs')
const {v4: uuidv4} = require('uuid')
const { generateToken, generateRefreshToken } = require('../helpers/auth')


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });


const getDataUser = async(req,res)=> {
    try {
        const {rows} = await userModels.getData()
        response(res, rows, 'success', 200, 'Get Data Success',)
    } catch (error) {
        console.log(error);
        res.send({message: 'error'})
    }
}

// const myRecipes = async(req,res)=> {
//     try {
//         const id = req.params.id
//         const result = await userModels.myRecipe(id)
//         console.log(result);
//     } catch (error) {
//         console.log(error);
//     }
// }

const insertDataUser = async(req,res) => {
    try {
        const { name, phone, email, password } = req.body
        // const image = await cloudinary.uploader.upload(photo.path, { folder: 'Recipes/User' })
            const salt = bcrypt.genSaltSync(10);
            const passwordHash = bcrypt.hashSync(password, salt);
            const filterEmail = await userModels.findUserEmail(email);
            if(!filterEmail.rowCount){
                let dataUser = { id: uuidv4(), name, phone, email, password: passwordHash }
                const {data} = await userModels.insertData(dataUser)
                response(res, data, 'success', 200, 'Insert Data Success')
            }else{
                res.send({message: 'Email is Already Exist'})
            }
    } catch (error) {
        console.log(error);
        res.send({message: 'error'})
    }
}

const login = async(req,res) => {
    const {email, password} = req.body
    const {rows: [dataUser]} = await userModels.findUserEmail(email)
    if(!dataUser){
        return response(res, null, 'failed', 403, 'login failed! wrong email or password')
    }
    // console.log(dataUser);
    const validationPassword = bcrypt.compareSync(password, dataUser.password)
    console.log(validationPassword);
    if(!validationPassword){
        return response(res, null, 'failed', 403, 'login failed! wrong email or password')
    }
    let payload = {
        id: dataUser.id,
        email: dataUser.email,
        password: dataUser.password,
        photo: dataUser.photo
    }
        dataUser.token = generateToken(payload)
        dataUser.refreshToken= generateRefreshToken(payload)
        response(res, dataUser, 'success', 200, 'login success')
}

const profile = async(req,res) => {
    try {
        const email = req.payload.email
        const { rows: [user] } = await userModels.findUserEmail(email)
        response(res, user, 'suuccess', 200, 'get profile success')
    } catch (error) {
        console.log(error);
        res.json({message: 'error', error})
    }
}

const updateDataUser = async(req,res) => {
    try {
        const id = req.params.id
        // console.log(id);
        // const { name, phone, email, password } = req.body
        // console.log(req.body);
        const photo = req.file
        const image = await cloudinary.uploader.upload(photo.path, { folder: 'Recipes/User' })
        const data = {
            id,
            photo: image.secure_url
        }
        console.log(data);
        const result = await userModels.updateData(data)
        console.log(result);
        response(res, null, 'success', 200, 'Update Data Success')
    } catch (error) {
        console.log(error);
        res.send({message: 'error'})
    }
}

const deleteDataUser = async(req,res) => {
    try {
        const id = req.params.id
        const result = await userModels.deleteData(id)
        response(res, result.data, 'success', 200, 'Delete Data Success')
    } catch (error) {
        res.send({message: 'error', error})
    }
}

module.exports = {
    getDataUser,
    insertDataUser,
    updateDataUser,
    deleteDataUser,
    login,
    profile,
    // myRecipes
}