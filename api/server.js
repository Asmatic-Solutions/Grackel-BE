const express = require("express");
const cors = require("cors")

const authRouter = require("./auth/authRouter");

const server = express();
server.use(express.json());
server.use(cors());

server.use("/api/auth",authRouter);


server.get("/", (req,res)=>{
    res.status(200).json("Api is up!")
})

module.exports = server;