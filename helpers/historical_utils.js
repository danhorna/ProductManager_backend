const historicalFunctions = {};
const Historical = require('../models/Historical');
const { HistoricalPrice } = require('../models/HistoricalPrices');

historicalFunctions.newHistorical = (code, price, iva) => {
    const newHistoricalPrice = new HistoricalPrice({
        price,
        iva,
        date: new Date()
    });
    const newHistorical = new Historical({
        code,
        historicalPrices: [newHistoricalPrice]
    });
    return newHistorical.save()
}

historicalFunctions.newPriceToHistorical = (code, price, iva) => {
    const newHistoricalPrice = new HistoricalPrice({
        price,
        iva,
        date: new Date()
    });
    return Historical.findOneAndUpdate(
        { code },
        {
            $push:
                { historicalPrices: newHistoricalPrice }
        })
}

historicalFunctions.getProductHistorical = (code) => {
    return Historical.findOne({code})
}



module.exports = historicalFunctions