const db = require("../../data/db-config");
module.exports = {
    createManualMeal,
    getLastMealsFrom,
    getMealOn
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
function getLastMealsFrom(User_ID,time=1,timePeriod="week"){
    return db("Meals_Users").select("*")
    .where(db.raw(`\"Date\" > now() - interval '${time} ${timePeriod}'`))
    .andWhere({User_ID}).then(data=>{
        return data
    })
}

function getMealOn(User_ID,date){
    return db("Meals_Users").select("*")
    .where(db.raw(`\"Date\"::date = '${date}'::date`))
    .andWhere({User_ID}).then(data=>{
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