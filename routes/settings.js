const { Router } = require('express');
const router = Router();
const { getSettings } = require('../controllers/settings_controller');

router.route('/')
    .get(getSettings)

module.exports = router