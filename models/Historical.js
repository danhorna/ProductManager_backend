const { HistoricalPricesSchema } = require('./HistoricalPrices')
const { Schema, model } = require('mongoose');

const HistoricalSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    historicalPrices: [HistoricalPricesSchema]
})

module.exports = model('Historical', HistoricalSchema)