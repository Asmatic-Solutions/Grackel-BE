const jwt = require("jsonwebtoken");
const secret = require("./secrets").secret

module.exports = (req,res,next) => {
    const token = req.headers.authorization;
    console.log("Secret" , secret)
    jwt.verify(token, secret, (err,decoded)=>{
        if(err){
            console.log(err);
            return res.status(401).json ({message:"Not Authorized"})
        }
        next();
    })
}