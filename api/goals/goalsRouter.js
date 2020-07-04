const router = require("express").Router();
const jwt = require("jsonwebtoken");
const secret = require("../auth/secrets").secret;
const db = require("../../data/db-config");
const Goals = require("./goalsModel");

//Create new goal
router.post("/",goalVerification,(req,res)=>{ 
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

//Delete goal
router.post("/",(req,res)=>{
    if(!(req.body.goal_ID)){
        return res.status(403).json({Message:"Please provide goal_ID"});
    }


    //Check if goals exists

    //Delete goal duh

})



router.get("/",goalVerification,(req,res)=>{
    res.status(201).json("ok")
})

router.put("/",goalVerification,(req,res)=>{
    res.status(201).json("ok")
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

function goalVerification(req,res,next){
    if(!(req.body.goal)){
        return res.status(403).json({Message:"Please provide goal"});
    }
    next();
}

function getIDbyusername(token){
    const {username} = jwt.verify(token,secret);
    return db("Users").select("ID").where({"Username":username}).first().then((id)=>{
        return id;
    })
}

