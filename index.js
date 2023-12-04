const dotenv = require('dotenv');
const express = require('express');
require("express-async-errors");
const cors = require("cors");
const connection = require('./db');
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/songs");
const artistRoutes = require("./routes/artists");
const searchRoutes = require("./routes/search");
const app = express();

dotenv.config();

connection();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/login", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/", searchRoutes);


const port = process.env.PORT||3050
app.listen(port, console.log(`connected port ${port}`))