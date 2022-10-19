const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const AuthRouter = require('./routes/auth');
const ProductsRouter = require('./routes/products');
const Stripe = require('./routes/Stripe');
const Order = require('./routes/Order');
const User = require('./routes/User');

async function main() {
    await mongoose.connect(process.env.MONG_URL);
    console.log('connecteddd');
}
main().catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(express.static('./images'));
app.use(cors());
app.use('/api/auth', AuthRouter);
app.use('/api/products', ProductsRouter);
app.use('/api/stripe', Stripe);
app.use('/api/Order', Order);
app.use('/api/users', User);

app.get('*', function (req, res) {
    console.log('404ing');
    res.render('404');
});

const port = 5000;
app.listen(port, () => console.log(`api start on port ${port}`));
