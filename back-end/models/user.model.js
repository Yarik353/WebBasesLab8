const {Schema, model} = require('mongoose')

UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    group: {type: String, required: true},
    variant: {type: Number, required: true},
    role: {type: String, default: "user", required: true},
    dateOfBirth: {type: String, default: null, required: false},
    placeOfBirth: {type: String, default: null, required: false},
    education: {type: String, default: null, required: false},
    hobby1: {type: String, default: null, required: false},
    hobby2: {type: String, default: null, required: false},
    hobby3: {type: String, default: null, required: false},
})
module.exports = model('User', UserSchema)