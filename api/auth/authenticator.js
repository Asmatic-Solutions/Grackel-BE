const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req,res,next) => {
    const token = req.headers.authorization;
    console.log("Secret" , process.env.SECRET)
    jwt.verify(token, process.env.SECRET || "nene", (err,decoded)=>{
        if(err){
            console.log(err);
            return res.status(401).json ({message:"Not Authorized"})
        }
        next();
    })



}