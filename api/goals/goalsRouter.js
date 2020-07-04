const router = require("express").Router();
const jwt = require("jsonwebtoken");
const secret = require("../auth/secrets").secret;
const db = require("../../data/db-config");
const Goals = require("./goalsModel");
const { getGoal } = require("./goalsModel");

//CREATE new goal
router.post("/",goalValidation,(req,res)=>{ 
    getIDbyusername(req.headers.authorization).then(({ID})=>{  // Retrive ID by the username provided in the token 
        Goals.getGoal(ID).then(data=>{ //Check if the ID already has a goal set up
            if(data)
                res.status(200).json({Message:"Goals has already been set"})
            else
                Goals.createGoal(req.body.goal,ID).then(goal=>{ // Pass the ID and the goal
                    res.status(201).json({message:"Goal created succesfully",goal})
                }).catch(err=>{
                    console.log(err);
                    res.status(500).json({message:"Error creating goal"})
                })
        }) 
    })
})

//DELETE goal
router.delete("/",(req,res)=>{
    getIDbyusername(req.headers.authorization).then(({ID})=>{  // Retrive ID by the username provided in the token 
        Goals.getGoal(ID).then(data=>{ //Check if the ID already has a goal set up
            if(data)    
                Goals.deleteGoal(ID).then(()=>{
                    res.status(200).json({message:"Removed goal succesfully"})
                }).catch(err=>{
                    console.log(err);
                    res.status(500).json({message:"Error deleting goal"})
                })
            else
                res.status(200).json({Message:"User doesnt have any goal set up"})
        }) 
    })
})
//PUT goal
router.put("/",goalValidation,(req,res)=>{
    getIDbyusername(req.headers.authorization).then(({ID})=>{  // Retrive ID by the username provided in the token 
        Goals.getGoal(ID).then(data=>{ //Check if the ID already has a goal set up
            if(data)    
                Goals.updateGoal(ID,req.body.goal).then(goal=>{
                    res.status(200).json({message:"Updated goal succesfully",goal})
                }).catch(err=>{
                    console.log(err);
                    res.status(500).json({message:"Error updating goal"})
                })
            else
                res.status(200).json({Message:"User doesnt have any goal set up"})
        }) 
    })
})

//GET Goal
router.get("/",(req,res)=>{
    getIDbyusername(req.headers.authorization).then(({ID})=>{  // Retrive ID by the username provided in the token 
        Goals.getGoal(ID).then(data=>{ //Check if the ID already has a goal set up
            if(data)    
                res.status(200).json(data);
            else
                res.status(200).json({Message:"No goal data was found linked with the specified ID"})
        }) 
    })
})


//Get Goal

//Update Goal

//Update daily goal

//Retrieve daily goal


//TEST ROUTE
router.get("/aa",(req,res)=>{
    Goals.getGoal(1).then(goal=>{
        console.log("goal",goal)
    });
})

module.exports = router;

function goalValidation(req,res,next){
    if(!(req.body.goal)){
        return res.status(403).json({message:"Please provide goal"});
    }
    if(req.body.goal>9999||req.body.goal<1000){
        return res.status(200).json({message:"Goal is not valid"})
    }
    next();
}

function getIDbyusername(token){
    const {username} = jwt.verify(token,secret);
    return db("Users").select("ID").where({"Username":username}).first().then((id)=>{
        return id;
    })
}

