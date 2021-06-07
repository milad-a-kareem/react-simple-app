// IMPORTS
const express = require('express')
const mysql = require('mysql')
const connection = require('./connection')
const bodyParser = require('body-parser')
const app = express()

// CORS management
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//ROUTES
const storesRoutes = require('./routes/stores')
const imagesRoutes = require('./routes/images')

//MIDDLE WARES
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/stores', storesRoutes)
app.use('/images', imagesRoutes)



app.get('/', (req,res)=>{res.send('welcome to the API')}) // root get request handler
app.get('*',(req,res)=>{res.send("404 page not found")}) // else get request handler




app.listen(4500)