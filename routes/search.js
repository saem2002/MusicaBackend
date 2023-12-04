const router = require('express').Router();
const {Song} = require('../models/song.js');
const {Artist} = require('../models/artist.js');
const auth = require("../middleware/auth.js");

router.get("/", auth, async (req,res) => {
    // const search = req.query.search;
    // if (search !== "") {
    //     const songs = await Song.find({
    //         name: {$regex: search, #options: "i"}
    //     }).limit(10);
    //     const artists = await Artist.find({
    //         name: {$regex: search, #options: "i"}
    //     }).limit(10);
    //     const result = {songs, playlists};
    //     res.status(200).send({data: result})
    // } else {
    //     res.status(200).send({})
    // }
})

module.exports = router;
