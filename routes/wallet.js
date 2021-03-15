/* 

Wallet Routes

host + /api/wallets

*/

const { Router } = require("express")
const { check } = require("express-validator")

const router = Router()

const { getWallets, createWallet, updateWallet, deleteWallet } = require("../controllers/wallet")

const { isDate } = require("../helpers/isDate")
const { validateFields } = require("../middlewares/validate-fields")
const { validateJWT } = require("../middlewares/validate-jwt")

router.use(validateJWT)

//Get Wallets

router.get("/", getWallets)

//Create Wallet

router.post(
  "/",
  [
    check("name", "The name is required").not().isEmpty(),
    check("money", "The money is required").not().isEmpty(),
    check("kind", "The kind is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("method", "The method is required").not().isEmpty(),
    check("date", "Date is required").custom(isDate),
    validateFields,
  ],
  createWallet
)

//Update wallet

router.put(
  "/:id",
  [
    check("name", "The name is required").not().isEmpty(),
    check("money", "The money is required").not().isEmpty(),
    check("kind", "The kind is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("method", "The method is required").not().isEmpty(),
    check("date", "Date is required").custom(isDate),
    validateFields,
  ],
  updateWallet
)

//Delete wallet

router.delete(
  '/:id',
  deleteWallet
)


module.exports = router