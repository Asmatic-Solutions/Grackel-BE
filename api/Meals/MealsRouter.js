const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.post("/",mealValidation,(req,res)=>{
    // Add current date to the obj
    // Link with user ID


    // Create meal based on req
    // Check if manual mode is active
        // Ignore the verification of Meals_Products [DB products]
        // Save the custom products and that's it return 201
    // Else [STRETCH]
        // Write current meal ID on Product_Meals
        // Write custom products 

    return res.status(201).json("MEALS WORKS GOOD")
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
    if(!(req.body.type))
        return res.status(403).json({message:"Missing type of meal"})
    
        if(req.body.manual){ // Verify manual meal mode
            if (!(req.body.manual_Ingredients) || req.body.manual_Ingredients.length<=0) // Check for manual_Ingredients array
                return res.status(403).json({message:"Missing manual ingredients array or array is empty"})

            const {manual_Ingredients} = req.body
            // Check for good format on manual ingredients
            manual_Ingredients.forEach(ingredient => {
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

