const router = require("express").Router();


router.post("/",(req,res)=>{
    return res.status(201).json("MEALS WORKS GOOD")
    // Create meal based on req
    // Check if manual mode is active
        // Ignore the verification of Meals_Products [DB products]
        // Save the custom products and that's it return 201
    // Else [STRETCH]
        // Write current meal ID on Product_Meals
        // Write custom products 
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




