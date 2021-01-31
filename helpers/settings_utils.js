const settingsFunctions = {};
const Settings = require('../models/Settings');

settingsFunctions.getSettings = () => {
    return Settings.findOne()
}

module.exports = settingsFunctions