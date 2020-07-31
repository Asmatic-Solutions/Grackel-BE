const router = require("express").Router();
const jwt = require("jsonwebtoken");
const secret = require("../auth/secrets").secret;
const db = require("../../data/db-config");
const Goals = require("./goalsModel");
const { getGoal } = require("./goalsModel");


//BIG TODO! 
/**
 * Find a way to verify if the goal exists
 * This way we save around 20 lines of code.
 * */ 

/* Goals endpoints */

//CREATE new goal
router.post("/",goalValidation,(req,res)=>{ 
    getIDbyusername(req.headers.authorization).then(({ID})=>{  // Retrive ID by the username provided in the token 
        Goals.getGoal(ID).then(data=>{ //Check if the ID already has a goal set up
            if(data.goal!=null)
                res.status(200).json({Message:"Goals has already been set"})
            else
                Goals.createGoal(req.body.goal,ID).then(({Goal})=>{ // Pass the ID and the goal
                    res.status(201).json({message:"Goal created succesfully",Goal})
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
        //Check for goal....
        Goals.getDaily(ID).then(data=>{
            if(data)
                res.status(200).json(data);
            else
                res.status(404).json({message:"No daily information found for that user"})
        })
    })
})

router.post("/daily",dailyValidation,(req,res)=>{ //This is basically updating the daily goal aka adding to the total
    getIDbyusername(req.headers.authorization).then(({ID})=>{  // Retrive ID by the username provided in the token 
        Goals.addDaily(ID, req.body.count).then(data=>{
            res.status(201).json(data)
        }).catch(err=>{
            console.log(err)
            res.status(500).json({message:"Error updating daily goal"})
        }) 
    })
})

//TEST ROUTE
router.get("/aa",(req,res)=>{
    Goals.getDaily(2,"2020-07-05").then(data=>{
        console.log("send",data);
    })
    res.status(404).json({message:"that user"})
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
    if(req.body.count>5000||req.body.count<0){ // What is the highest calorie intake a user should take before health problems...
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



