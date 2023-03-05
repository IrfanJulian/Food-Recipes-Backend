/* eslint-disable no-undef */
const { response } = require('../helpers/common')
const userModels = require('../models/user')
const cloudinary = require('cloudinary').v2
const bcrypt = require('bcryptjs')
const {v4: uuidv4} = require('uuid')
const { generateToken, generateRefreshToken } = require('../helpers/auth')
const { sendGmail } = require('../helpers/mailer')


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

const insertDataUser = async(req, res) =>{
    try {
        const dataUser = await userModels.findUserEmail(req.body.email)
        const digits = "0123456789";
        let otp = "";
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < 6; i++) {
          otp += digits[Math.floor(Math.random() * 10)];
        }
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(req.body.password, salt);
        if(!dataUser.rowCount){
            let data = {
                id: uuidv4(),
                name: req.body.name,
                email: req.body.email,
                password: passwordHash,
                phone: req.body.phone,
                otp
            }
            let result = await userModels.insertData(data)
            if(result){
                await sendGmail(data.email, data.otp)
                return res.send({status: 200, message: 'success check email'})
            }
            // console.log(data);
            res.send({status: 200, message: 'add data success'})
        }else{
            res.send({message: 'email is already exist'})
        }
    } catch (error) {
        console.log(error)
        res.send({message: 'error'})
    }
}

const forgotPassword = async (req,res) => {
    try {
        const email = req.body.email
        const dataUser = await userModels.findUserEmail(email)
        const digits = "0123456789";
        let otp = "";
        for (let i = 0; i < 6; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        if(dataUser){
            let result = await userModels.forgotPassword(email, otp)
            if(result){
                console.log('ini nodemailer',otp);
                await sendGmail(email, otp)
                return res.send({status: 200, message: 'success check email'})
            }
            return res.send({message: 'success'})
        }else{
            return res.send({message: 'error'})
        }
    } catch (error) {
        console.log(error);
        return response(res, null, 'error', 400, 'failed')
    }
}

const resetPassword = async(req, res) => {
    const email = req.params.email
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(req.body.password, salt);
    try {
        const dataUser = await userModels.findUserEmail(email)
        if(dataUser){
            await userModels.resetPassword(email, passwordHash)
            response(res, null, 'success', 200, 'password updated')
        }
    } catch (error) {
        console.log(error);
        return response(res, null, 'error', 400, 'failed')
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
    // console.log(validationPassword);
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
        res.cookie('token', dataUser.token, {
            httpOnly: true,
            maxAge: 60*1000*60*12,
            secure: false,
            path: '/',
            sameSite: 'Strict'
        })
        response(res, dataUser, 'success', 200, 'login success')
}

const profile = async(req,res) => {
    try {
        const id = req.params.id
        const { rows: [user] } = await userModels.getProfile(id)
        response(res, user, 'suuccess', 200, 'get profile success')
    } catch (error) {
        console.log(error);
        res.json({message: 'error', error})
    }
}

const getByEmail = async(req,res) => {
    try {
        const email = req.params.email
        const { rows: [user] } = await userModels.findUserEmail(email)
        console.log(user);
        response(res, user, 'success', 200, 'get data by email success')
    } catch (error) {
        console.log(error);
        res.json({message: 'error', error})
    }
}

const updateDataUser = async(req,res) => {
    try {
        const id = req.params.id
        const name = req.body.name
        // console.log(id);
        // const { name, phone, email, password } = req.body
        // console.log(req.body);
        const photo = req.file
        const image = await cloudinary.uploader.upload(photo.path, { folder: 'Recipes/User' })
        const data = {
            id,
            name,
            photo: image.secure_url
        }
        // console.log(data);
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
    getByEmail,
    forgotPassword,
    resetPassword
}