const historicalFunctions = {};
const Historical = require('../models/Historical');
const { HistoricalPrice } = require('../models/HistoricalPrices');

historicalFunctions.newHistorical = (code, price) => {
    const newHistoricalPrice = new HistoricalPrice({
        price,
        date: new Date()
    });
    const newHistorical = new Historical({
        code,
        historicalPrices: [newHistoricalPrice]
    });
    return newHistorical.save()
}

historicalFunctions.newPriceToHistorical = (code, price) => {
    const newHistoricalPrice = new HistoricalPrice({
        price,
        date: new Date()
    });
    return Historical.findOneAndUpdate(
        { code },
        {
            $push:
                { historicalPrices: newHistoricalPrice }
        })
}



module.exports = historicalFunctions