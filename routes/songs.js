const router = require("express").Router();
const { Song, validate } = require("../models/song.js");
const admin = require("../middleware/admin.js");
const validObjectId = require("../middleware/validObjectId.js");
const { artist, Artist } = require("../models/artist")

//Create song
router.post('/:email', async (req, res) => {

    const { error } = validate(req.body);
    const id = req.params.email;
    console.log(id);



    const findArtist = await Artist.findOne({ email: id });

    if (error) return res.status(400).send({ message: error.details[0].message });
    if (findArtist) {
        await findArtist.updateOne({ $push: { songs: { name: req.body.name } } })
    }
    const song = await Song(req.body).save();

    res.status(200).send({ data: song, message: "Canzone creata con successo" });
});

router.get('/change/:id', async (req, res) => {

const id = req.params.id
    
    const findsong = await Song.findOne({ _id: id});
    
    if (findsong) {
     
        await findsong.updateOne({ $set: {isApproved:"true"}  })
    }
    

    res.status(200).send({ data: findsong, message: "Canzone creata con successo" });
});

//Get songs
router.get("/", async (req, res) => {
    const songs = await Song.find();
    res.status(200).send({ data: songs });
});

//Update song
router.put("/:id", [validObjectId, admin], async (req, res) => {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send({ data: song, message: "Canzone modificata con successo" });
});

//Delete song by id
router.delete("/:id",async (req, res) => {
    await Song.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Canzone eliminata con successo" });
});

module.exports = router;


