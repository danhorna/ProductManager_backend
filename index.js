require('dotenv').config();
require('./database');
const express = require("express");
const app = express();
const cors = require('cors');

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(cors());
app.use(express.json({limit: '50mb'}));    //permitió recibir json desde un POST
app.use(express.urlencoded({limit: '50mb'}));

//routes
app.use('/api/products', require('./routes/products'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/historical', require('./routes/historical'));

//initializing
app.listen(app.get('port'), () => {
    console.log("El servidor está inicializado en el puerto " + app.get('port'));
});