const mongoose = require('mongoose');
const Schema = mongoose.Schema

// author have the type that will reference to userSchema in User model by matching the id
const placeSchema = mongoose.Schema({
    title: {
        type: String
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    order: {
        type: Number
    },
    image: {
        type: String
    },
    body: {
        type: String
    },
    coords: { latitude: Number, longitude: Number },
    name:{
        type: String
    },
    address:{
        type: String
    }

}, {timestamps: true})

const Place = mongoose.model('Place', placeSchema);

module.exports = { Place }