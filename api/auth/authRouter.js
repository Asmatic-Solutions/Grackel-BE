const router = require("express").Router();
const Users = require("./authModel");

const bcrypt = require("bcrypt");
require("dotenv").config();


router.post("/register",userValidation,(req,res)=>{
    const credentials = req.body;
    Users.getUserBy({"Username":credentials.username}).then((data)=>{
        if(data){ //Check if user already exists
            res.status(202).send({message:"User already exists"}); 
        }else{
            credentials.password = bcrypt.hashSync(credentials.password, process.env.ROUNDS || 8); // Hash password
            // Create new user with the updated credentials (hashed password)
            Users.createUser(credentials).then(User=>{
                Users.getUserByID(User.ID).then(data=>{
                    data?res.status(201).json(data):res.status(500).json({message:"User was not created"})
                })
            }).catch(error=>{
                console.log(error);
                res.status(500).json({message:"Couldnt create user",error})
            })
        }
    })
})

//Login

//TEST ROUTE
router.get("/aa",(req,res)=>{
    Users.getUserByID("8").then(data=>{
        console.log("DATADATA",data)
    })
})

module.exports = router;

function userValidation(req,res,next){
    if(!(req.body.username)||!(req.body.password)||!(req.body.email)){
        return res.status(403).send({message:"Please make sure to provide username, password and email"});
    }
    next();
}