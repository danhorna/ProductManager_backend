const mongoose = require('mongoose');

const { CERRAJERIA_BACKEND_HOST, CERRAJERIA_BACKEND_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${CERRAJERIA_BACKEND_HOST}/${CERRAJERIA_BACKEND_DATABASE}`;

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log('Db conectada'))
    .catch(err => console.log(err))