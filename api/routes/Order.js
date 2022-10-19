const Order = require('../models/Order');
const router = require('express').Router();
const { verifyTOkenAdmin } = require('../middleware/authmiddleware');
/// Create order
router.post('/createOrder', async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const saveOrder = await newOrder.save();
        res.status(200).json({ success: true, saveOrder });
    } catch (error) {
        res.status(500).json(error);
    }
});

/// GET USER ORDER
router.get('/find/:userId', verifyTOkenAdmin, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/find/update/order', verifyTOkenAdmin, async (req, res) => {
    const { idOrder, status } = req.body;
    let updateOrder = {
        status,
    };
    try {
        updateOrder = await Order.findByIdAndUpdate(idOrder, updateOrder, { new: true });
        res.status(200).json(updateOrder);
    } catch (error) {
        res.status(500).json(error);
    }
});

/// GET ALL
router.get('/', verifyTOkenAdmin, async (req, res) => {
    try {
        const allorder = await Order.find();
        res.status(200).json(allorder);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/stats', async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await Order.aggregate([
            { $match: { createAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: '$createAt' },
                },
            },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: 1 },
                },
            },
        ]);

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/income', async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([
            {
                $match: {
                    createAt: { $gte: previousMonth },
                    ...(productId && {
                        products: { $elemMatch: { _id: productId } },
                    }),
                },
            },
            {
                $project: {
                    month: { $month: '$createAt' },
                    sales: '$amount',
                },
            },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: '$sales' },
                },
            },
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
