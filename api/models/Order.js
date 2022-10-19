const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    products: [
        {
            color: { type: String },
            size: { type: String },
            _id: { type: String },
            quantity: { type: Number, default: 1 },
            price: { type: Number },
        },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: 'New Order' },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Order', OrderSchema);
