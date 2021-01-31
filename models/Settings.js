const { Schema, model } = require('mongoose');

const SettingsSchema = new Schema({
    iva: {
        type: Number,
        required: true
    },
    mypercentaje: {
        type: Number,
        required: true
    }
})

module.exports = model('Settings', SettingsSchema)