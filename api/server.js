const express = require("express");
const cors = require("cors")

const authenticator = require("./auth/authenticator");
const authRouter = require("./auth/authRouter");
const goalRouter = require("./goals/goalsRouter");

const server = express();
server.use(express.json());
server.use(cors());

server.use("/api/auth",authRouter);

server.use("/api/goal", authenticator, goalRouter);


server.get("/", (req,res)=>{
    res.status(200).json("Api is up!")
})

module.exports = server;