const db = require("../../data/db-config");
module.exports = {
    getUserByID,
    getUserBy,
    createUser
}


function getUserByID(id){
    return db("Users").where({"id":id}).select("*")
}
function getUserBy(filter){
    return db("Users").where(filter).select("Username")
}
function createUser(credentials){
    console.log(credentials);
    const date = new Date().toISOString();
    return db("Users")
    .insert(
    {"Username":credentials.username,
    "Password":credentials.password,
    "Email":credentials.email,
    "Created_at":date,
    "Lastconnection_at":date,
    "Role":1
    }).then(data=>{
        return getUserBy({"Username":credentials.username}).first()
    });
    
}