const {response} = require('express')

const jwt = require('jsonwebtoken')

const validateJWT = (req, res = response, next) => {

    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            status: 401,
            message: 'There is not token in request' 
        })
    }

    try {
        
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )

        req.uid = uid
        req.name = name

    } catch (error) {
        console.log(error)

        return res.status(401).json({
            status: 401,
            message: 'Token is not valid'
        })
    }

    next()

}

module.exports = {
    validateJWT
}