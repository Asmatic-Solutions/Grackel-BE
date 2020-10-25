const db = require("../../data/db-config");
module.exports = {
    createManualMeal
}

function createManualMeal(meal){
    const date = new Date().toISOString();
    meal = {Date:date,...meal,Manual_Ingredients:JSON.stringify(convertManualIngredients(meal.Manual_Ingredients))}
    return db("Meals_Users").insert(meal).then(()=>{
        return getLastMeal(meal.User_ID)
    })
}

function getLastMeal(User_ID){
    return db("Meals_Users").orderBy("Date","desc").select("*").where({User_ID}).limit(1).first().then(data=>{
        // Check if its manual mode, if so simply return data
        if (!data.Manual)
            console.log("Not manual mode not yet implemented")
        return data
    })
}




function convertManualIngredients(Ingredients){

    return Ingredients.map(Ingredients=>{
      return {
          name:Ingredients.name,
          category:Ingredients.category,
          calories:Ingredients.calories,
          notes:Ingredients.notes
      }
    })

  }