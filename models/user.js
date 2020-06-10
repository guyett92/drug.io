const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = mongoose.connection;

/*
For each user, and will embed the comments/reviews they make
*/

const userSchema = new Schema({
    name: String,
    email: String,
    avatarURL: String,
    //reviews: [reviewSchema],
    googleId: String,
    liked: {
        type: Array,
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);