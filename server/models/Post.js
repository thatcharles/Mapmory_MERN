const mongoose = require('mongoose');
const Schema = mongoose.Schema

// author have the type that will reference to userSchema in User model by matching the id
const postSchema = mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String
    }
}, {timestamps: true})

const Post = mongoose.model('Post', postSchema);

module.exports = { Post }