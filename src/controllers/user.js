/* eslint-disable no-undef */
const { response } = require('../helpers/common')
const userModels = require('../models/user')
const cloudinary = require('cloudinary').v2
const bcrypt = require('bcryptjs')
const {v4: uuidv4} = require('uuid')


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

const insertDataUser = async(req,res) => {
    try {
        const { name, phone, email, password, new_password } = req.body
        const photo = req.file
        const image = await cloudinary.uploader.upload(photo.path, { folder: 'Recipes/User' })
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);
        const filterEmail = await userModels.findUserEmail(email);
        if(!filterEmail.rowCount){
            let dataUser = { id: uuidv4(), name, phone, email, password: passwordHash, new_password, photo: [image.secure_url] }
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

const updateDataUser = async(req,res) => {
    try {
        const {data} = await userModels.updateData(req.params.id, req.body)
        response(res, data, 'success', 200, 'Update Data Success')
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
    deleteDataUser
}