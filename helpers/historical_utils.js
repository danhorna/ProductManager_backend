const historicalFunctions = {};
const Historical = require('../models/Historical');
const { HistoricalPrice } = require('../models/HistoricalPrices');

historicalFunctions.newHistorical = (product_id, price, iva) => {
    const newHistoricalPrice = new HistoricalPrice({
        price,
        iva,
        date: new Date()
    });
    const newHistorical = new Historical({
        product_id,
        historicalPrices: [newHistoricalPrice]
    });
    return newHistorical.save()
}

historicalFunctions.newPriceToHistorical = (product_id, price, iva) => {
    const newHistoricalPrice = new HistoricalPrice({
        price,
        iva,
        date: new Date()
    });
    return Historical.findOneAndUpdate(
        { product_id },
        {
            $push:
                { historicalPrices: newHistoricalPrice }
        })
}

historicalFunctions.getProductHistorical = (product_id) => {
    return Historical.findOne({product_id})
}



module.exports = historicalFunctions