const router = require("express").Router();
const {User, validate} = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth.js");
const admin = require("../middleware/admin.js");
const validObjectId = require("../middleware/validObjectId.js");
const {isValidObjectId} = require("mongoose");

//Create user
router.post("/", async(req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send({message: error.details[0].message});

    const user = await User.findOne({email: req.body.email});
    if (user) {
        
 
           res.status(400).json({ message: "Already have an account with this email! Please try to sign in." });

      }
  
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    let newUser = await new User({
        ...req.body,
        password: hashPassword
    }).save();

    newUser.password = undefined;
    newUser.__v = undefined;

    res.status(200).send({data: newUser, message: "Account creato con successo"})
});
router.post("/search", async(req,res) => {
    try {
        
        const user = await User.findOne({_id: req.body._id});
        if(user){
            res.status(200).send({data: user, message: "Account creato con successo"})
        }else{
            throw error
        }     
    } catch (error) {
        res.status(400).send("ERROR")
    }

   
});

//Get users
router.get("/", async(req,res) => {
    const users = await User.find().select("-password-__v");
    res.status(200).send({data: users});
});

//Get users by id
router.get("/:id", [validObjectId, auth], async(req,res) => {
    const user = await User.findById(req.params.id).select("-password-__v");
    res.status(200).send({data: user});
});

//Update user by id
router.put("/:id", [validObjectId, auth], async(req,res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},
        {new: true}
    ).select("password-__v");
    res.status(200).send({data: user, message: "Utente modificato con successo"})
});

//delete user by id
router.delete("/:id", async(req,res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send({message: "Utente eliminato con successo"})
});

module.exports = router;