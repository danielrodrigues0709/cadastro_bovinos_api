const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/product-controller');

router.get('/', ProductsController.getProducts);
router.get('/:productId', ProductsController.getProductDetail);
router.patch('/:productId', ProductsController.updateProduct);
router.delete('/:productId', ProductsController.deleteProduct);

module.exports = router;