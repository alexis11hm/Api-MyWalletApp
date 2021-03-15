
const { Schema, model } = require('mongoose')

const WalletSchema = Schema({
    name: {
        type: String,
        required: true
    },
    money:{
        type: Number,
        required: true,
    },
    kind: {
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    method: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

WalletSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = model('Wallet',WalletSchema)