const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    sideEffect: Boolean,
    liked: Boolean,
    postedBy: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    likedCount: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

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
    },
    image: String,
    reviews: [ reviewSchema ]
}, { timestamps: true});

module.exports = mongoose.model('Drug', drugSchema);