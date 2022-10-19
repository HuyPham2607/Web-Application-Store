const router = require('express').Router();
const User = require('../models/User');

const { verifyTOkenAdmin } = require('../middleware/authmiddleware');

router.get('/stats', verifyTOkenAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await User.aggregate([
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

router.get('/', verifyTOkenAdmin, async (req, res) => {
    try {
        const GetUser = await User.find();
        res.status(200).json(GetUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/update/user', verifyTOkenAdmin, async (req, res) => {
    const { name, lastname, address, userId } = req.body;
    try {
        let updateUser = {
            name,
            lastname,
            address,
        };
        updateUser = await User.findByIdAndUpdate(userId, updateUser, { new: true });
        return res.status(200).json({ success: true, message: 'User has been updated', updateUser });
    } catch (error) {
        return res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted...');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
