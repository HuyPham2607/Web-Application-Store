const router = require('express').Router();
const stripe = require('stripe')(
    'sk_test_51LX37zIAN2OFIUhudFDFsjJzaPqRaS4eZitHHuUqSXjD5aiyQoY2OIcrKuZ4aKyWetJb1vgLgZc24JC0pdKme1ca00ucts5xUG',
);
require('dotenv').config();

router.post('/create-checkout-session', async (req, res) => {
    const line_items = req.body.cartItem.products.map((item) => {
        return {
            price_data: {
                currency: 'vnd',
                product_data: {
                    name: item.name,
                    images: [item.imageUrl],
                },
                unit_amount: req.body.cartItem.total,
            },
            quantity: req.body.cartItem.quantity,
        };
    });
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.send({ url: session.url });
});
module.exports = router;
