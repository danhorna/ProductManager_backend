const { Schema, model } = require('mongoose');

const HistoricalPricesSchema = new Schema({
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})
module.exports.HistoricalPricesSchema = HistoricalPricesSchema;
module.exports.HistoricalPricesModel = model('HistoricalPrices', HistoricalPricesSchema);