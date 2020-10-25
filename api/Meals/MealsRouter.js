const router = require("express").Router();
const jwt = require("jsonwebtoken");
const secret = require("../auth/secrets").secret;
const db = require("../../data/db-config");
const Meals = require("./MealsModel");

router.post("/",mealValidation,(req,res)=>{
    let meal = req.body;
    getIDbyusername(req.headers.authorization).then(({ID})=>{
        meal = {User_ID:ID,...meal}
        if(meal.Manual) // Check if manual mode is active
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
    return res.status(201).json("MEALS WORKS GOOD")
    // Check if manual mode is active
        // Ignore Meals_Products
        // Retrieve the current meal
    // Else [STRETCH]   
        // Get all references of current id from Meals_Products
})


module.exports = router;

function mealValidation(req,res,next){
    if(!(req.body.Type))
        return res.status(403).json({message:"Missing type of meal"})
    
        if(req.body.Manual){ // Verify manual meal mode
            if (!(req.body.Manual_Ingredients) || req.body.Manual_Ingredients.length<=0) // Check for manual_Ingredients array
                return res.status(403).json({message:"Missing manual ingredients array or array is empty"})

            const {Manual_Ingredients} = req.body
            // Check for good format on manual ingredients
            Manual_Ingredients.forEach(ingredient => {
                if (!(ingredient.name))
                    return res.status(403).json({message:"Manual ingredients must have a name"})
            });  
        }

    next();
}

function getIDbyusername(token){
    const {username} = jwt.verify(token,secret);
    return db("Users").select("ID").where({"Username":username}).first().then((id)=>{
        return id;
    })
}

