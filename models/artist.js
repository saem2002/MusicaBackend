const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require("jsonwebtoken");
const song = require('../models/song.js').Song.schema;

const artistSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    genre: {type: String, required: true},
    songs: [
        {
            name:{type: String}
        }
    ]
});

artistSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        {_id: this._id, name: this.name, isAdmin: this.isAdmin},
        process.env.JWTPRIVATEKEY1,
        {expiresIn: "7d"}
    )
    return token;
}

const validate = (artist) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        genre: Joi.string().required()
    });
    return schema.validate(artist)
}

const Artist = mongoose.model("artist", artistSchema);

module.exports = {Artist, validate};
