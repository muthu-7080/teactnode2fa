const mysql = require('mysql')

const DBconnection = mysql.createConnection({ 
    host: "localhost",
    user: "root",
    password: "",
    database: "userMgt",
});

DBconnection.connect((err)=>{
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE users (name VARCHAR(100), email VARCHAR(60), mobile int(10), password VARCHAR(12))";
   
   if(!sql){
    DBconnection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Table created");
      });
   }  
})

module.exports = DBconnection;