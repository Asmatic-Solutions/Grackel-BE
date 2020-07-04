const router = require("express").Router();

//Create new goal

//Get Goal

//Update Goal

//Update daily goal

//Retrieve daily goal


//TEST ROUTE
router.get("/aa",(req,res)=>{
    console.log(secret);
    Users.getUserByID("8").then(data=>{
        console.log("Test data",data)
    })
})

module.exports = router;

