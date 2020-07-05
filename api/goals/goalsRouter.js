const router = require("express").Router();
const jwt = require("jsonwebtoken");
const secret = require("../auth/secrets").secret;
const db = require("../../data/db-config");
const Goals = require("./goalsModel");
const { getGoal } = require("./goalsModel");

/* Goals endpoints */

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
            if(data!=null)    
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
        Goals.getGoal(ID).then((data)=>{ //Check if the ID already has a goal set up
            if(data.Goal!=null)    
                res.status(200).json(data);
            else
                res.status(200).json({Message:"No goal data was found linked with the specified ID"})
        }).catch(err=>{
            console.log(err);
            res.status(500).json({message:"Error retrieving goal"})
        })
    })
})

/* Daily endpoints */
router.get("/daily",(req,res)=>{
    getIDbyusername(req.headers.authorization).then(({ID})=>{  // Retrive ID by the username provided in the token 
        Goals.getGoal(ID).then(data=>{ //Check if the ID already has a goal set up
            if(data){ // check if user has a goal set up
                console.log(data.ID);
            }
            else
                res.status(200).json({Message:"No goal data was found linked with the specified ID"})
        })
    })
})

router.post("/daily",dailyValidation,(req,res)=>{

})

router.delete("/daily",dailyValidation,(req,res)=>{

})

router.put("/daily",dailyValidation,(req,res)=>{

})






//TEST ROUTE
router.get("/aa",(req,res)=>{
    Goals.createDaily(1,124).then(data=>{
        console.log(data);
    })
})
module.exports = router;

function goalValidation(req,res,next){
    if(!(req.body.goal)){
        return res.status(403).json({message:"Please provide goal"});
    }
    if(req.body.goal>9999||req.body.goal<1000){ //This numbers should be determined by the health information of the individual
        return res.status(200).json({message:"Goal is not valid"})
    }
    next();
}

function dailyValidation(req,res,next){
    if(!(req.body.count)){
        return res.status(403).json({message:"Please provide a daily count to add"});
    }
    if(req.body.goal>5000){ // What is the highest calorie intake a user should take before health problems...
        return res.status(200).json({message:"Daily value is not valid"})
    }
    next();
}


function getIDbyusername(token){
    const {username} = jwt.verify(token,secret);
    return db("Users").select("ID").where({"Username":username}).first().then((id)=>{
        return id;
    })
}

