const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TransactionSchema = new Schema({
    Transid: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: String,
        required: true
    },
    createdat: {
        type: String,
        required: true
    },
    updatedat: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    wallet: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true,
        unique: true
      },
    company: {
        type: String,
        required: true
      }
    },

 {
	collection: 'Transactions'
})

module.exports = mongoose.model('Transactions', TransactionSchema)