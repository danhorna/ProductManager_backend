const { HistoricalPricesSchema } = require('./HistoricalPrices')
const { Schema, model } = require('mongoose');

const HistoricalSchema = new Schema({
    product_id: {
        type: String,
        required: true
    },
    historicalPrices: [HistoricalPricesSchema]
})

module.exports = model('Historical', HistoricalSchema)