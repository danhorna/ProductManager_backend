const { Router } = require('express');
const router = Router();
const { getAllProducts } = require('../controllers/products_controller');

router.route('/')
    .get(getAllProducts)

module.exports = router;