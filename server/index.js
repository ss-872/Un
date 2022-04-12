const express=require('express')
const dotenv=require("dotenv")
const bodyParser=require("body-parser")
const mysql=require("mysql")
const app=express()

dotenv.config();
app.use(bodyParser.json());
const conn=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:process.env.password,
  database:process.env.database,
});

conn.connect((err) =>{
if(err) throw err;
console.log('Mysql Connected with App...');
});
app.get('/api/information',(req, res) => {
  let sqlQuery = "SELECT * FROM information";
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err){
      res.status(400);
      throw new Error('Error in retriving the question');
    }
    else res.status(200).send(results);
  });
});
app.post('/api/information', (req,res)=> {

    const question = req.body.question;
    const options = req.body.options;
    const required = req.body.required;
    
    console.log(question,options,require)
    
  conn.query("INSERT INTO information (question, options, required) VALUES (?,?,?)",[question,options,required], (err,result)=>{
       if(err) {
           console.log(err)
       } 
       console.log(result)
    }
    );   
    })
    app.delete('/api/information/:id',(req, res) => {
        let sqlQuery = "DELETE FROM information WHERE id="+req.params.id+"";
          
        let query = conn.query(sqlQuery, (err, results) => {
          if(err){
            res.status(400);
            throw new Error('Error in deleting the question');
          }
          else res.status(200).send("Deleted the question successfully");
        });
      });
const PORT=process.env.PORT||5000
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})