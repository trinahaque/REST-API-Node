const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST requests to /products'
    });
});
 
// sending product id
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special'){
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    }
    else{
        res.status(200).json({
            message: "failed"
        })
    }
});

// patch basically updates a record
router.patch('/', (req, res, next) => {
    res.status(200).json({
        message: 'Updating requests to /products'
    });
});

router.delete('/', (req, res, next) => {
    res.status(200).json({
        message: 'Deleting requests to /products'
    });
});

module.exports = router;