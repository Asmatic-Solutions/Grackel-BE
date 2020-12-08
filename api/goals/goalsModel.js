const db = require("../../data/db-config");
module.exports = {
    getGoal,
    createGoal,
    deleteGoal,
    updateGoal,
    getDaily,
    createDaily,
    addDaily,
}

function createGoal(goal,id){
    return db("users").where({id}).update({goal}).then(()=>{
        return getGoal(id);
    });
}

function deleteGoal(id){
    return db("users").where({id}).update({"goal":0});
}

function updateGoal(id,goal){
    return db("users").update({goal}).where({id}).then(()=>{
        return getGoal(id);
    });
}

function getGoal(id){
    return db("users").select("goal").where({id}).first();
}


//Daily functions

function getDaily(user_id, date = new Date().toISOString().substring(0, 10)){ //If no date is provided it will fetch the current date.
    return db("users_days").select("*").where({user_id, date}).first();
}

function createDaily(user_id){
    const date = new Date().toISOString();
    return db("users_days").insert({
        user_id,
        date,
    }).then(()=>{
        return getDaily(user_id).then(data=>{
            return data;
        });
    })
}

function addDaily(user_id,DailyCount){
    return getDaily(user_id).then(data=>{
        if(data){ //Check if there is data for that User_id
            return updateDaily(data, DailyCount);
        }else{
            return createDaily(user_id).then(newdata=>{
                return updateDaily(newdata, DailyCount);
            });
        }
    })
}

function updateDaily(data, DailyCount){
    const {user_id,date} = data;
    return getGoal(user_id).then(({goal})=>{ // Get goal from the user.
        data.daily_count += DailyCount; // Updates the daily count with the one passed by the user
        if(goal<data.daily_count){
            data.success = false; //Checks if goal has been reached
        }
        return db("users_days").where({user_id,date}).update(data).then(()=>{
            return {...data,goal};
        });
    })
}