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

function createGoal(Goal,ID){
    return db("Users").where({ID}).update(Goal).then(()=>{
        return getGoal(User_ID);
    });
}

function deleteGoal(ID){
    return db("Users").where({User_ID}).update({"Goal":0});
}

function updateGoal(ID,Goal){
    return db("Users").update({Goal}).where({ID}).then(()=>{
        return getGoal(ID);
    });
}

function getGoal(ID){
    return db("Users").select("Goal").where({ID}).first();
}

//Daily functions

function getDaily(User_ID){
    return db("User_Days").select("*").where(User_ID);
}

function createDaily(User_ID){
    const date = new Date().toISOString();
    return db("User_Days").insert({
        User_ID,
        "Date":date,
    })
}

function addDaily(User_ID,DailyCount){

}


function deleteDaily(User_ID,DailyCount){

}

function updateDaily(User_ID,DailyCount){

}