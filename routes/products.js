const { Router } = require('express');
const router = Router();
const { getAllProducts, newList, getProductById } = require('../controllers/products_controller');

router.route('/')
    .get(getAllProducts)

router.route('/newlist')
    .post(newList)

router.route('/:id')
    .get(getProductById)

module.exports = router;