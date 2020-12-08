const db = require("../../data/db-config");
module.exports = {
    createManualMeal,
    getLastMealsFrom,
    getMealOn,
}

function createManualMeal(meal){
    const date = new Date().toISOString();
    meal = {date:date,...meal,manual_ingredients:JSON.stringify(convertManualIngredients(meal.manual_ingredients))}
    return db("meals_users").insert(meal).then(()=>{
        return getLastMeal(meal.user_id)
    })
}

function getLastMeal(user_id){
    return db("meals_users").orderBy("date","desc").select("type", "date", "manual", "manual_ingredients").where({user_id}).limit(1).first().then(data=>{
        // Check if its manual mode, if so simply return data
        if (!data.manual)
            console.log("Not manual mode not yet implemented")
        return data
    })
}
function getLastMealsFrom(user_id,time=1,timePeriod="week"){
    return db("meals_users").select("type", "date", "manual", "manual_ingredients")
    .where(db.raw(`\"date\" > now() - interval '${time} ${timePeriod}'`))
    .andWhere({user_id}).orderBy("date","desc")
    
    .then(data=>{
        return data
    })
}

function getMealOn(user_id,date){
    return db("meals_users").select("type", "date", "manual", "manual_ingredients")
    .where(db.raw(`\"date\"::date = '${date}'::date`))
    .andWhere({user_id}).then(data=>{
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