const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
    const token = req.header("x-auth-token");
    if (!token)
        return res.status(400).send({message: "Accesso negato, nessun token fornito"})

    jwt.verify(token, process.env.JWTPRIVATEKEY, (error, validToken) => {
        if(error) {
            return res.status(400).send({message: "Token non valido"})
        } else {
            req.user = validToken;
            next();
        }
    })
}