const mongoose = require('mongoose')

const restaurantsSchema = new mongoose.Schema({                     
    areaName : {
        type : String
    },
    avgRating : {
        type : Number
    },
    costForTwo : {
        type : String
    },
    cuisines : {
        type : Array
    } ,
    name : {
        type : String
    }
})

const Restaurant = mongoose.model('RestaurantList',restaurantsSchema)

const userSchema = new mongoose.Schema({                     
    userName: {
        type : String,
    },
    contact: {
        type : String,
    },
    email : {
        type : String,
    },
    password : {
        type : String,
    }
})

const Users = mongoose.model('userDetails',userSchema)
module.exports = {Restaurant,Users}