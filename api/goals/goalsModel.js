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
function deleteGoal(User_ID){
    return db("Goals").del().where({User_ID});
}

function getGoal(User_ID){
    return db("Goals").select("*").where({User_ID}).first();
}