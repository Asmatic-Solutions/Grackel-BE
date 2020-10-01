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

function createGoal(Goal,ID){
    return db("Users").where({ID}).update({Goal}).then(()=>{
        return getGoal(ID);
    });
}

function deleteGoal(ID){
    return db("Users").where({ID}).update({"Goal":0});
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

function getDaily(User_ID, date = new Date().toISOString().substring(0, 10)){ //If no date is provided it will fetch the current date.
    return db("User_Days").select("*").where({User_ID, "Date":date}).first();
}

function createDaily(User_ID){
    const date = new Date().toISOString();
    return db("User_Days").insert({
        User_ID,
        "Date":date,
    }).then(()=>{
        return getDaily(User_ID).then(data=>{
            return data;
        });
    })
}

function addDaily(User_ID,DailyCount){
    return getDaily(User_ID).then(data=>{
        if(data){ //Check if there is data for that User_ID
            return updateDaily(data, DailyCount);
        }else{
            return createDaily(User_ID).then(newdata=>{
                return updateDaily(newdata, DailyCount);
            });
        }
    })
}

function updateDaily(data, DailyCount){
    return getGoal(data.User_ID).then(({Goal})=>{ // Get goal from the user.
        data.DailyCount += DailyCount; // Updates the daily count with the one passed by the user
        if(Goal<data.DailyCount){
            data.Success = false; //Checks if goal has been reached
        }
        return db("User_Days").where({"User_ID":data.User_ID,"Date":data.Date}).update(data).then(()=>{
            return data;
        });
    })
}