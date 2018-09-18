const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

// importing the Product from the model
const Product = require("../models/product");

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/', (req, res, next) => {
    // new Product is the name of the model
    const product = new Product({
        // this will automatically create a new id
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    
    // save() provided my mongoose that will save the data in the database
    // result will give the result of the operation in the database
    product.save().then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));

    res.status(201).json({
        message: 'Handling POST requests to /products',
        product: product
    });
});
 
// sending product id
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: "No valid entry found for the id"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

// patch basically updates a record
router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updating requests to /products'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleting requests to /products'
    });
});

module.exports = router;