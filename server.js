const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const products = require('./routes/products')

const PORT = 5000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use('/products', products)

app.listen(PORT, function () {
    console.log(`I'm starting on port ${PORT}`)
})