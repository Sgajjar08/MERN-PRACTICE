const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
let Product = require('./product-model');
const productRoutes = express.Router();

const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/products', { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

productRoutes.route('/').get(function(res, req) {
    Product.find(function(err, products) {
        if (err)
            console.log(err);
        else
            res.json(products);
    });
});

productRoutes.route('/:id').get(function(res, req) {
    let id = req.params.id;
    Product.findById(id, function(err, product) {
        res.json(product);
    });
});

productRoutes.route('/add').post(function(res, req) {
    let product = new Product(req.body);
    product.save().then(product => {
            res.status(200).json({ 'product': 'product added successfully' });
        })
        .catch(err => {
            res.status(400).send('Operatio failed.');
        });
});

productRoutes.route('/update/:id').post(function(res, req) {
    Product.findById(req.params.id, function(err, product) {
        if (!product)
            res.status(404).send('Product not found');
        else
            product.product_name = req.body.product_name;
        product.product_type = req.body.product_type;
        product.product_price = req.body.product_price;

        product.save().then(product => {
                res.json('Product updated successfully');
            })
            .catch(err => {
                res.status(400).send('Product updation failed.');
            });
    });
});

app.use('/products', productRoutes);

app.listen(PORT, function() {
    console.log("Server is runing on PORT: " + PORT);
});