const db = require("../../data/db-config");
module.exports = {
    getUserByID,
    getUserBy,
    createUser,
    getIDByUsername
}


function getUserByID(ID){
    return db("Users")
    .where({ID})
    .join("Roles", function(){
        this.on("Users.Role", "=", "Roles.ID")
    })
    .select("*")
}

function getUserBy(filter){
    return db("Users").where(filter).select("*")
}

function getIDByUsername(Username){
    return db("Users").where({Username}).select("ID").first()
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
        return getIDByUsername(credentials.username)
    });
    
}