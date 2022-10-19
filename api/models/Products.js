const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
    title: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    identified: { type: String, required: true },
    typeProduct: { type: String, required: true },
    size: { type: Array, require: true },
    color: { type: Array, require: true },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Products', ProductsSchema);
