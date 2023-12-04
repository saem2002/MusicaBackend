const mongoose = require('mongoose');
const Joi = require('joi');

const songSchema = new mongoose.Schema({
    name: {type: String, required: true},
    Artistname: {type: String, required: true},
    genre: {type: String, required: true},
    duration: {type: String, required: true},
    isApproved: {type: String, required: true}
});

const validate = (song) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        genre: Joi.string().required(),
        duration: Joi.string().required(),
        Artistname:Joi.string().required(),
        isApproved:Joi.string().required()
    });
    return schema.validate(song)
}

const Song = mongoose.model("song", songSchema);

module.exports = {Song, validate};