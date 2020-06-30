const server = require("./api/server");
require("dotenv").config();

const port = process.env.PORT || "5001"

server.listen(port, ()=>{
    console.log("Server is up @ port ", port);
})