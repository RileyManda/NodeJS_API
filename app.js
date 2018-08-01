//load app using express
const express = require('express')
const app = express()
const morgan = require ('morgan')
const bodyParser = require('body-parser')
//npm i body-parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('./public'))
app.use(morgan('combined'))//combined

//router
const router = require('./routes/users.js')
app.use(router)

//localhost:4000
app.listen(4000,()=>{
  console.log("Server is up and running on 4000")
})
