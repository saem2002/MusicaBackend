const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

module.exports = async() => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    try {
        await mongoose.connect(process.env.DB_URI, connectionParams);
        console.log("Connected database")
    } catch(error) {
        console.log("Impossibile connettersi al database")
    }
}