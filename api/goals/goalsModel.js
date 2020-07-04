const db = require("../../data/db-config");
module.exports = {
    getGoal,
    createGoal,
    deleteGoal
}

function createGoal(Goal,User_ID){
    return db("Goals").insert({Goal, User_ID}).then(()=>{
        return getGoal(User_ID);
    });
}
function deleteGoal(ID){
    return db("Goals").delete().where({ID});
}

function getGoal(User_ID){
    return db("Goals").select("*").where({User_ID}).first();
}