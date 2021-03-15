
const { response } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { generateJWT } = require('../helpers/jwt')

const createUser = async (req, res = response) => {

    const { email, password } = req.body
    
    try {

        let user = await User.findOne({ email: email})

        if(user){
            return res.status(400).json({
                status: 400,
                message: 'Email had already been registered'
            })
        }

        user = new User(req.body)

        //Encrypt password

        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        await user.save()

        //Generate JWT
        const token = await generateJWT(user.id, user.name)

        return res.status(201).json({
            status: 201,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {

        console.log(error)
        return res.status(500).json({
            status: 500,
            message: 'Error in the server'
        })
        
    }

}

const loginUser = async (req, res = response) =>{

    const { email, password } = req.body

    try {

        const user = await User.findOne({email: email})

        if(!user){
            return res.status(400).json({
                status: 404,
                message: 'User not found'
            })
        }

        //Confirm passwords
        const validatePassword = bcrypt.compareSync(password, user.password)
        if(!validatePassword){
            return res.status(400).json({
                status: 400,
                message: 'Wrong password'
            })
        }

        //Generate JWT
        const token = await generateJWT(user.id, user.name)

        return res.status(200).json({
            status: 200,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            status: 500,
            message: 'Error in the server'
        })
    }

} 

const revalidateToken = async (req, res = response) => {

    const { uid, name} = req
    
    //Generate token
    const token = await generateJWT(uid, name)

    return res.status(200).json({
        status: 200,
        uid,
        name,
        token
    })

}

module.exports = {
    createUser,
    loginUser,
    revalidateToken
}