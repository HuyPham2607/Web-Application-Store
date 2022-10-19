const router = require('express').Router();

const Products = require('../models/Products');

const verifyToken = require('../middleware/authmiddleware');

router.post('/add', async (req, res) => {
    const { title, name, imageUrl, price, identified, size, typeProduct, color } = req.body;
    if (!title || !name || !imageUrl || !price || !identified || !size || !typeProduct || !color)
        return res.status(400).json({ success: false, message: 'forgot info products' });
    const nameproduct = await Products.findOne({ name });
    if (nameproduct) return res.status(500).json({ success: false, message: 'product name already exists' });
    let colorArray;
    let sizeArray;
    if (typeof color === 'string') {
        colorArray = color.split(',');
    } else {
        colorArray = color;
    }
    if (typeof size === 'string') {
        sizeArray = size.split(',');
    } else {
        sizeArray = size;
    }
    try {
        const newProducts = new Products({
            title,
            name,
            imageUrl,
            price,
            identified,
            size: sizeArray,
            color: colorArray,
            typeProduct,
        });
        await newProducts.save();
        res.status(200).json({ success: true, message: 'ok' });
    } catch (error) {
        console.log(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Products.findByIdAndDelete(req.params.id);
        res.status(200).json('Product has been deleted...');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    // const qSize = req.query.size;

    // let products;
    // if (qSize) {
    //     products = await Products.find({
    //         size: {
    //             $in: [qSize],
    //         },
    //     });
    // } else {
    //     products = await Products.find();
    // }

    const product = await Products.find();

    res.status(200).json(product);
});

router.get('/:id', async (req, res) => {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        const product = await Products.findById(req.params.id);
        res.status(200).json(product);
    }
});

router.put('/:id', async (req, res) => {
    const { ProductId, name, price, color, size } = req.body;
    let colorArray;
    let sizeArray;
    if (typeof color === 'string') {
        colorArray = color.split(',');
    } else {
        colorArray = color;
    }
    if (typeof size === 'string') {
        sizeArray = size.split(',');
    } else {
        sizeArray = size;
    }
    let pricetotal = Number(price);

    try {
        let updateProduct = {
            name,
            price: pricetotal,
            color: colorArray,
            size: sizeArray,
        };
        updateProduct = await Products.findByIdAndUpdate(ProductId, updateProduct, { new: true });
        return res.status(200).json({ success: true, message: 'Success', updateProduct });
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;
