const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema({
    product_name: {
        type: String
    },
    product_type: {
        type: String
    },
    product_price: {
        type: Float
    },
});

module.exports = mongoose.model('Product', Product);