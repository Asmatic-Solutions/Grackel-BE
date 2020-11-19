const router = require("express").Router();
const jwt = require("jsonwebtoken");
const secret = require("../auth/secrets").secret;
const db = require("../../data/db-config");
const Meals = require("./MealsModel");

router.post("/",mealValidation,(req,res)=>{
    let meal = req.body;
    getIDbyusername(req.headers.authorization).then(({id})=>{
        meal = {user_id:id,...meal}
        if(meal.manual) // Check if manual mode is active
            // Ignore the verification of Meals_Products [DB products] and simply add the meals
            Meals.createManualMeal(meal).then(data=>{
                if(data)
                    return res.status(201).json(data)
            }).catch(err=>{
                console.log("err",err)
            })
        else // Else [STRETCH]
        // Write current meal ID on Product_Meals
        // Write custom products 
            console.log("Not manual mode not yet implemented")
    })
})

router.get("/",(req,res)=>{
    const {time,timeperiod} = req.query
    getIDbyusername(req.headers.authorization).then(({id})=>{
        Meals.getLastMealsFrom(id,time,timeperiod).then((data)=>{
            data
            ?res.status(200).json(data)
            :res.status(404).json({message:"No meals found"})
        }).catch(err=>{
            console.log(err)
            res.status(500).json(err)
        })
    })
})

router.get("/on",(req,res)=>{
    const {date} = req.query
    getIDbyusername(req.headers.authorization).then(({id})=>{
            Meals.getMealOn(id,date).then(data=>{
                res.status(200).json(data)
            }).catch(err=>{
                console.log(err)
                res.status(500).json(err)
            })
    })
})

module.exports = router;

function mealValidation(req,res,next){
    if(!(req.body.type))
        return res.status(400).json({message:"Missing type of meal"})
    
        if(req.body.manual){ // Verify manual meal mode
            if (!(req.body.manual_ingredients) || req.body.manual_ingredients.length<=0) // Check for manual_Ingredients array
                return res.status(400).json({message:"Missing manual ingredients array or array is empty"})
            const {manual_ingredients} = req.body
            // Check for good format on manual ingredients
            manual_ingredients.forEach(ingredient => {
                if (!(ingredient.name))
                    return res.status(400).json({message:"Manual ingredients must have a name"})
            });  
        }
    next();
}

function getIDbyusername(token){
    const {username} = jwt.verify(token,secret);
    return db("users").select("id").where({username}).first().then((id)=>{
        return id;
    })
}

