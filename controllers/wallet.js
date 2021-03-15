
const { response } = require('express')
const bcrypt = require('bcryptjs')
const Wallet = require('../models/Wallet')
const { generateJWT } = require('../helpers/jwt')

const getWallets = async (req, res = response) => {

    const wallets = await Wallet.find().populate('user','name')

    return res.status(200).json({
        status: 200,
        length: wallets.length,
        wallets
    })

}

const createWallet = async (req, res = reponse) => {

    const wallet = new Wallet(req.body)

    try {
        
        wallet.user = req.uid
        const savedWallet = await wallet.save()

        return res.status(200).json({
            status: 200,
            wallet: savedWallet
        })

    } catch (error) {
        
        console.log(error)

        return res.status(500).json({
            status: 500,
            message: 'Internal server error'
        })

    }
}


const updateWallet = async (req, res = response) => {

    const walletId = req.params.id
    const uid = req.uid

    try {
        
        const wallet = await Wallet.findById(walletId)

        if(!wallet){
            return res.status(404).json({
                status: 404,
                message: 'Wallet not found'
            })
        }

        if(wallet.user.toString() !== uid){
            return res.status(401).json({
                status: 401,
                message: 'You do not have priviligies to edit this wallet'
            })
        }

        const newWallet = {
            ...req.body,
            user: uid
        }

        const updatedWallet = await Wallet.findOneAndUpdate(walletId, newWallet, {new: true})

        return res.status(200).json({
            status: 200,
            wallet: updatedWallet
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            status: 500,
            message: 'Internal server error'
        })

    }

} 


const deleteWallet = async (req, res = response) => {

    const walletId = req.params.id
    const uid = req.uid

    try {

        const wallet = await Wallet.findById(walletId)

        if(!wallet){
            return res.status(404).json({
                status: 404,
                message: 'Wallet not found'
            })
        }

        if(wallet.user.toString() !== uid){
            return res.status(401).json({
                status: 401,
                message: 'You do not have priviligies to delete this wallet'
            })
        }

        await Wallet.findOneAndDelete(walletId)

        return res.status(200).json({
            status: 200,
            message: 'Wallet deleted successfully'
        })
        
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            status: 500,
            message: 'Internal server error'
        })
    }
} 

module.exports = {
    getWallets,
    createWallet,
    updateWallet,
    deleteWallet
}