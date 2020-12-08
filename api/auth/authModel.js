const db = require("../../data/db-config");
module.exports = {
    getUserByID,
    getUserBy,
    createUser,
    getIDByUsername
}

function getUserByID(id){
    return db("users")
        .join("roles", function(){
            this.on("users.role_id", "=", "roles.id")
        })
        .where({"users.id":id})
        .select("users.id","username", "email", "created_at", "lastconnection_at", "role")
        .first()
}

function getIDByUsername(username){
    return db("users").where({username}).select("id").first()
}

function getUserBy(filter){
    return db("users").where(filter).select("*").first()
}

function createUser(credentials){
    const date = new Date().toISOString();
    return db("users")
    .insert({
        username:credentials.username,
        password:credentials.password,
        email:credentials.email,
        created_at:date,
        lastconnection_at:date,
        role_id:2
    }).then(data=>{
        return getIDByUsername(credentials.username)
    });
    
}