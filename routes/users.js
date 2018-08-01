//users routes
const express = require('express')
const mysql = require('mysql')



const router = express.Router()
router.get('/messages',(req , res) => {
  console.log("Getting messages")
  res.end()
})

router.get("/users",(req, res) => {
  const connection = getConection()
  const queryString = "SELECT * FROM users"
  connection.query(queryString,(err , rows ,fields) =>{
    if (err) {
      console.log("Failed to fetch Users:" + err)
      res.sendStatus(500)
      return
    }
    res.json(rows)
  })
  })
   //get user by id
   router.get('/user/:id',(req, res) => {
    console.log("Fectching User with id:" + req.params.id)
  const connection = getConection()
    const userId = req.params.id
  const queryString ="SELECT * FROM users WHERE id =?"
    connection.query(queryString,[userId],(err,rows,fields) =>{
      if(err){
        console.log("Failed to fetch Users" + err)
        res.sendStatus(500)
        //res.end()
       // throw err
        return }
        console.log("Fetched Users successfully")
        
      res.json(rows)
    })
  
  })
//create user from html form
router.post('/user_create',(req,res)=>{
  console.log("Trying to create user")
  console.log("Username:" + req.body.create_user_name)
  const username = req.body.create_user_name

  console.log("First Name:" + req.body.create_first_name)
  const firstname = req.body.create_first_name

  console.log("Last Name:" + req.body.create_last_name)
  const lastname = req.body.create_last_name

  const queryString = "INSERT INTO  users (user_name,first_name,last_name)VALUES(?,?,?)"
 getConection().query(queryString,[username,firstname,lastname],(err,results,fields)=>{
   if(err){
     console.log("Failed to insert new User" + err)
     res.sendStatus(500)
     return
   }
   console.log("Inseeted a new user with ID: ", results.insertedId);
   res.end()

 })
  res.end()
})

const pool = mysql.createPool({
  connectionLimit: 10,
  host:'localhost',
  user:'root',
  password:'Admin2018@$#!',
  database:'api_db'
})
  function getConection(){
    return pool
    
  }
module.exports = router