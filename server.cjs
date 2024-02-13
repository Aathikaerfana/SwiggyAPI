const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

const {Restaurant,Users} = require('./schema.cjs')

const app = express()
app.use(bodyParser.json())
app.use(cors())

async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://aathikaerfana:Aathi@cluster0.hpk6eh3.mongodb.net/Swiggy?retryWrites=true&w=majority')
        console.log('DB connection established ;)')
        const port = process.env.PORT || 8000
        app.listen(port, function() {
            console.log(`Listening on port ${port}...`)
        })
    } catch(error) {
        console.log(error)
        console.log('Couldn\'t establish connection :(')
    }
}
connectToDb()

app.post('/add-restaurant',async function(request,response) {
    try{                                                     
     await Restaurant.create({                                
         "areaName" : request.body.areaName,          
         "avgRating" : request.body.avgRating,
         "costForTwo" : request.body.costForTwo,
         "cuisines" : request.body.cuisines,
         "name" : request.body.name
     })
     response.status(201).json({                     
         "status":"successfully created"  ,
         "message" :  "restaurant entry successfull"                     
     })
 } catch(error){
     response.status(500).json({                     
         "status":"failure",           
         "error" : "server error"
     })
 }
})
app.get('/get-restaurant-details', async function(request,response) {
    try{                                                     
     const restaurantDetails = await Restaurant.find()
     response.status(200).json(restaurantDetails)
 } catch(error){
     response.status(500).json({                     
         "status":"failure",           
         "error" : "server error"
     })
 }
})

app.post('/create-new-user',async function(request,response) {
    try{                                                      
     await Users.create({                                
         "userName" : request.body.userName,          
         "contact" : request.body.contact,
         "email" : request.body.email,
         "password" : request.body.password
     })
     response.status(201).json({                     
         "status":"user successfully created"  ,
         "message" :  "user created"                     
     })
 } catch(error){
     response.status(500).json({                     
         "status":"user not created",           
         "error" : "server error"
     })
 }
 })
 app.post('/validate-user',async function(request,response) {
     try{
        const user = await Users.findOne({
             "email" : request.body.email,
             "password" :request.body.password
         })
         if(user){
             response.status(200).json({
                 "message" : "valid user"
             })
         }else{
             response.status(401).json({
                 "message" : "invalid user"
             })
         }
     }catch(error)
     {
         response.status(500).json({                     
             "error" : "internal server error"
         })
     }
 })