//Import dependencies modules
const express = require('express')
const path = require("path");
//const bodyParser = require('body-parser)

//Create an Express.js instance:
const app = express()

//config Express.js
app.use(express.json())
app.set('port', 3000)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    next();
})

//logger middleware
app.use(function (req, res, next) {
    console.log("In comes a " + req.method + " to " + req.url);
    next();
});

//connect to MongoDB
const MongoClient = require('mongodb').MongoClient;

let db;

MongoClient.connect('mongodb+srv://haydenfdes:hayden26@cluster0.biskd8a.mongodb.net/', (err, client) => {
    db = client.db('Fathi_UG')
})

//display a message for root path to show that API is working
app.get('/', (req, res, next) => {
    res.send('Select a collection, e.g., /collection/lessons')
})

//get the collection name
app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName)
    //console.log('collection name:', req.collection)
    return next()
})

//retrieve all the objects from a collection
app.get('/collection/:collectionName', (req, res, next) => {
    req.collection.find({}).toArray((err, results) => {
        if (err) return next(err)
        res.send(results)
    })
})
//Open Port
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Running")
})