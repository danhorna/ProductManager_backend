const { Router } = require('express');
const router = Router();
const { getAllProducts, newList } = require('../controllers/products_controller');

router.route('/')
    .get(getAllProducts)

router.route('/newlist')
    .post(newList)

module.exports = router;