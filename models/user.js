const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const artist = require('../models/artist.js').Artist.schema;

dotenv.config();

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false}
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        {_id: this._id, name: this.name, isAdmin: this.isAdmin},
        process.env.JWTPRIVATEKEY,
        {expiresIn: "7d"}
    )
    return token;
}

const validate = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(10).required(),
        email: Joi.string().required(),
        password: Joi.string().required()
        });
    return schema.validate(user)
}

const User = mongoose.model("user", userSchema);

module.exports = {User, validate};