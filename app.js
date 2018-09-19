// this will make handing request a lot easier
const express = require('express');
const app = express();
// body parser helps with url encoding, getting json data from the request
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//CORS error prevention
// Giving access to clients with different server origin
app.use((req, res, next) => {
    // all client server should have access from the restful API
    // very typical to do it in all restful API
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTION'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// mongoose.connect("mongodb+srv://kay:" + 
// process.env.MONGO_ATLAS_PW +
// "@cluster0.mongodb.net/?serverSelectionTryOnce=false&serverSelectionTimeoutMS=15000");

mongoose.connect("mongodb://video-tutorial:" + 
process.env.MONGO_ATLAS_PW +
"@video-tutorial-shard-00-00-7pup8.mongodb.net:27017,video-tutorial-shard-00-01-7pup8.mongodb.net:27017,video-tutorial-shard-00-02-7pup8.mongodb.net:27017/test?ssl=true&replicaSet=video-tutorial-shard-0&authSource=admin&retryWrites=true")
// db = mongoc_client_get_database (client, "test");


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// handling errors when the route is different than the other two
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

// handling errors when the error occurs in other places (database)
// basically all other errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;