
const {response} = require('express')
const {validationResult} = require('express-validator')

const validateFields = (req, res = response, next) => {
    //Manage errors
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            status: 400,
            erros: errors.mapped()
        })
    }
    //If there is not some error, then we call next method (controller)
    next()
}

module.exports = {
    validateFields
}