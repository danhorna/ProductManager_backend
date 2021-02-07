const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    iva: {
        type: Number,
        required: true
    },
    lastUpdate: {
        type: Date,
        required: true
    }
})

module.exports = model('Product', ProductSchema)