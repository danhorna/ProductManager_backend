const settingsCtrl = {};
const { getSettings } = require('../helpers/settings_utils');

settingsCtrl.getSettings = async (req, res) => {
    const settings = await getSettings();
    res.json(settings);
}

module.exports = settingsCtrl