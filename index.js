require('dotenv').config();
require('./database');
const express = require("express");
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares


//routes
app.use('/api/products', require('./routes/products'));

//initializing
app.listen(app.get('port'), () => {
    console.log("El servidor está inicializado en el puerto " + app.get('port'));
});