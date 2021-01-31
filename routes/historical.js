const { Router } = require('express');
const router = Router();
const { getProductHistorical } = require('../controllers/historical_controller');

router.route('/:productcode')
    .get(getProductHistorical)

module.exports = router;