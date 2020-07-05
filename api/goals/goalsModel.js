const db = require("../../data/db-config");
module.exports = {
    getGoal,
    createGoal,
    deleteGoal,
    updateGoal,
    getDaily,
    createDaily,
    deleteDaily,
    updateDaily,
}

function createGoal(Goal,User_ID){
    return db("Goals").insert({Goal, User_ID}).then(()=>{
        return getGoal(User_ID);
    });
}

function deleteGoal(User_ID){
    return db("Goals").del().where({User_ID});
}

function updateGoal(User_ID,Goal){
    return db("Goals").update({Goal}).where({User_ID}).then(()=>{
        return getGoal(User_ID);
    });
}

function getGoal(User_ID){
    return db("Goals").select("*").where({User_ID}).first();
}

//Daily functions

function getDaily(User_ID){
    return db("User_Days").select("*").where(User_ID);
}

function createDaily(Goal_ID){
    const date = new Date().toISOString();
    return db("User_Days").insert({
        Goal_ID,
        "Date":date,
    })
}

function addDaily(User_ID,DailyCount){

}


function deleteDaily(User_ID,DailyCount){

}

function updateDaily(User_ID,DailyCount){

}