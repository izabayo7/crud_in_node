const mongoose = require('mongoose'); // import mongoose
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male','female']
    }
})

exports.User =  mongoose.model('user',schema)
