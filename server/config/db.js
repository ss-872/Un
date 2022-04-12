const mysql=require('mysql')
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"S@29",
    database:"un",
})
module.exports=db;