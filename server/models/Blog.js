const mongoose = require('mongoose');
const Schema = mongoose.Schema

// author have the type that will reference to userSchema in User model by matching the id
const blogSchema = mongoose.Schema({
    content: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = { Blog }