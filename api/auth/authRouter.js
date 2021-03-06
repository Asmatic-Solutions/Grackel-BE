const router = require("express").Router();
const Users = require("./authModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("./secrets").secret
require("dotenv").config();


router.post("/register",userValidation,(req,res)=>{
    if(!(req.body.email)){
        return res.status(403).send({message:"Please provide Email"}); // I wanted to include this into userValidation, but that would simply mess with that method being use in /login
    }
    const credentials = req.body;
    Users.getUserBy({"username":credentials.username}).then((data)=>{
        if(data){ //Check if user already exists
            return res.status(202).send({message:"user already exists"}); 
        }else{
            credentials.password = bcrypt.hashSync(credentials.password, process.env.ROUNDS || 8); // Hash password
            // Create new user with the updated credentials (hashed password)
            Users.createUser(credentials).then(user=>{
                Users.getUserByID(user.id).then(data=>{
                    data?res.status(201).json(data):res.status(500).json({message:"user was not created"})
                })
            }).catch(error=>{
                console.log(error);
                res.status(500).json({message:"Couldnt create user",error})
            })
        }
    })
})

//Login
router.post("/login",userValidation,(req,res)=>{
    const {username,password} = req.body;
    Users.getUserBy({username}).then(user=>{
        if(user && bcrypt.compareSync(password, user.password)){
            const token = generateToken(user);
            res.status(200).json({message:"Authorized", token})
        }else{
            res.status(401).json({message:"Not authorized"})
        }
    })
})

module.exports = router;

function userValidation(req,res,next){
    if(!(req.body.username)||!(req.body.password)){
        return res.status(403).send({message:"Please make sure to provide username and password"});
    }
    next();
}

function generateToken(user){
    const payload = {
        username:user.username,
        email:user.email,
    }
    const options = {
        expiresIn:"14d"
    }
    return jwt.sign(payload,secret, options)
}