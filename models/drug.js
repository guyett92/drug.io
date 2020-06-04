const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = mongoose.connection;

const drugSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0
    },
    generic: {
        type: Boolean,
        default: false
    },
    dosage: {
        type: Number,
        min: 0
    },
    family: {
        type: String
    }
}, { timestamps: true});

module.exports = mongoose.model('Drug', drugSchema);