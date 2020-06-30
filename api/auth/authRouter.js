const router = require("express").Router();
const Users = require("./authModel");

const bcrypt = require("bcrypt");
require("dotenv").config();

//Register
router.post("/register",userValidation,(req,res)=>{
    const credentials = req.body;
    Users.getUserBy({"Username":credentials.username}).then(({data})=>{
        if(data){
            res.status(202).send({message:"User already exists"})
        }else{
            // Hash password
            credentials.password = bcrypt.hashSync(credentials.password, process.env.ROUNDS || 8);
            // Create new user and pass the hashed password
            Users.createUser(credentials).then(data=>{
                console.log("data",data)
            }).catch(error=>{
                console.log(error);
            })

            // Verify for errrors
    }
    })
})

//Login

module.exports = router;

function userValidation(req,res,next){
    if(!(req.body.username)||!(req.body.password)){
        return res.status(403).send({message:"Please make sure to provide both username and password"});
    }
    next();
}