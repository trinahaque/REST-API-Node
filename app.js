// this will make handing request a lot easier
const express = require('express');
const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

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