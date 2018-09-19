const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

// importing the Product from the model
const Product = require("../models/product");

// this route gets all the products
router.get('/', (req, res, next) => {
    Product.find()
        .select('name price _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/products/" + doc._id
                        }
                    }
                })
            }
            // console.log(docs);
            res.status(200).json(response);
        })
        .catch(err => {
            // console.log(err);
            res.status(500).json({
                error: err
            });
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
        // console.log(result);
        res.status(201).json({
            message: 'Created a new product successfully',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/products/" + result._id
                }
            }
        });
    })
    .catch(err => {
        // console.log(err);
        res.status(500).json({
            error: err
        });
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
        // console.log(err);
        res.status(500).json({error: err});
    });
});

// patch basically updates a record
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    // this iterates through each of the property that gets passed on
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id}, { $set: updateOps})
        .exec()
        .then(result => {
            // console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            // console.log(err);
            res.status(500).json({
                error:err
            });
        });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
    //   console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;