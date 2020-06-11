const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    sideEffect: Boolean,
    liked: Boolean,
    date: {
        type: Date,
        default: function() {
            return new Date(Date.now()).toLocaleString();
        }
    },
    postedBy: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
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