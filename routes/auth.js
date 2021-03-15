
/*

USER ROUTES /Auth

host + /api/auth

*/

const { Router } = require('express')
const { check } = require('express-validator')

const router = Router()

const { createUser, loginUser, revalidateToken } = require('../controllers/auth')
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')

router.post(
    '/new',
    [//Middlewares
        check('name','The name is required').not().isEmpty(),
        check('email','The email is required').isEmail(),
        check('password','The password length must be 10 characters').isLength({min: 10}),
        validateFields
    ],
    createUser
)

router.post(
    '/',
    [
        check('email','Email is required').isEmail(),
        check('password','The password must be at least 10 characters').isLength({min: 10}),
        validateFields
    ],
    loginUser
)

router.get(
    '/renew',
    validateJWT,
    revalidateToken
)

module.exports = router