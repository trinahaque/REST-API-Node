// this will make handing request a lot easier
const express = require('express');
const app = express();
// body parser helps with url encoding, getting json data from the request
const bodyParser = require('body-parser');

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