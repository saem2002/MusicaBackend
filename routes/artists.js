const router = require("express").Router();
const {Artist, validate} = require("../models/artist");
const auth = require("../middleware/auth.js");
const validObjectId = require("../middleware/validObjectId.js");

//Create artist
router.post("/", async(req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send({message: error.details[0].message});

    const artist = await Artist.findOne({email: req.body.email});
    if(artist)
        return res.status(403).send({message: "Already existed account"})
    let newArtist = await new Artist({
        ...req.body
    }).save();

    newArtist.password = undefined;
    newArtist.__v = undefined;

    res.status(200).send({data: newArtist, message: "Account created successfully"})
});

router.post("/login",async(req,res) => {
    const user = await Artist.findOne({email: req.body.email,password:req.body.password});
    if (!user)
        return res.status(400).send({message: "Email or password non valid"});
    const token = user.generateAuthToken();
    res.status(200).send({data: token, message: "Accesso in corso..."});
});

router.post("/search", async(req,res) => {
    try {
        
        const user = await Artist.findOne({_id: req.body._id});
        if(user){
            res.status(200).send({data: user, message: "Account created successfully"})
        }else{
            throw error
        }     
    } catch (error) {
        res.status(400).send("ERROR")
    }

   
});

//Get artists
router.get("/getArtist", async(req,res) => {
    const artists = await Artist.find().select("-password-__v");
    res.status(200).send({data: artists});
});

//Get artists by id
router.get("/:id", [validObjectId, auth], async(req,res) => {
    const artist = await Artist.findById(req.params.id).select("-password-__v");
    res.status(200).send({data: artist});
});

//Update artist by id
router.put("/:id", [validObjectId, auth], async(req,res) => {
    const artist = await Artist.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},
        {new: true}
    ).select("password-__v");
    res.status(200).send({data: artist, message: "success"})
});

//delete artist by id
router.delete("/:id",  async(req,res) => {
    await Artist.findByIdAndDelete(req.params.id);
    res.status(200).send({message: "success"})
});

module.exports = router;