const historicalCtrl = {};
const { getProductHistorical } = require('../helpers/historical_utils');

historicalCtrl.getProductHistorical = async (req, res) => {
    const historical = await getProductHistorical(req.params.productcode);
    res.json(historical)
}

module.exports = historicalCtrl