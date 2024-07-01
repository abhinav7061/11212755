const express = require('express');
const { getTopProducts, getProductById } = require('../Controller/productController');

const router = express.Router();

router.get('/categories/:categoryname/products', getTopProducts);
router.get('/categories/:categoryname/products/:productid', getProductById);

module.exports = router;
