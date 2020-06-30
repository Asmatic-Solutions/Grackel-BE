const db = require("../../data/db-config");
module.exports = {
    getUserByID,
    getUserBy,
    createUser,
    getIDByUsername
}


function getUserByID(ID){
    return db("Users")
        .join("Roles", function(){
            this.on("Users.Role_ID", "=", "Roles.ID")
        })
        .where({"Users.ID":ID})
        .select("Users.ID","Username", "Email", "Created_at", "Lastconnection_at", "Role")
        .first()
}

function getIDByUsername(Username){
    return db("Users").where({Username}).select("ID").first()
}

function getUserBy(filter){
    return db("Users").where(filter).select("*").first()
}



function createUser(credentials){
    const date = new Date().toISOString();
    return db("Users")
    .insert(
    {"Username":credentials.username,
    "Password":credentials.password,
    "Email":credentials.email,
    "Created_at":date,
    "Lastconnection_at":date,
    "Role_ID":1
    }).then(data=>{
        return getIDByUsername(credentials.username)
    });
    
}