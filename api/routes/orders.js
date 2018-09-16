const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /Orders'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'Handling POST requests to /Orders',
        order: order
    });
});
 
// sending order id
router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        orderId: req.params.orderId,
        message: 'You discovered the special ID'
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleting requests to /orders'
    });
});

module.exports = router;