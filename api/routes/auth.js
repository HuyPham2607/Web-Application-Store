const router = require('express').Router();
const argon2 = require('argon2');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const fileStore = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../images'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname);
    },
});
const upload = multer({ storage: fileStore });

router.post('/upload', upload.single('avatar'), (req, res) => {
    res.send('single File upload success');
});

router.post('/register', async (req, res) => {
    const { name, lastname, email, password, confirmpassword } = req.body;
    if (!name || !lastname || !email || !password || !confirmpassword)
        return res.status(400).json({ success: false, message: 'không có  email or password and confirmpassword' });

    const checkemail = await User.findOne({ email });
    if (checkemail) return res.status(400).json({ success: false, message: 'Email already exists' });

    if (password !== confirmpassword)
        return res.status(400).json({ success: false, message: 'password !== confirmpassword' });

    try {
        const hashedPassword = await argon2.hash(password);
        const hashedconfirmPassword = await argon2.hash(confirmpassword);
        const newUser = new User({
            name,
            avatar: 'https://firebasestorage.googleapis.com/v0/b/store-8cd28.appspot.com/o/function%20getTime()%20%7B%20%5Bnative%20code%5D%20%7D128-1280406_view-user-icon-png-user-circle-icon-png.png?alt=media&token=92a66e26-bcf7-4110-b768-df063c410fe5',
            lastname,
            email,
            address: '',
            password: hashedPassword,
            confirmpassword: hashedconfirmPassword,
        });
        await newUser.save();
        return res.status(200).json({ success: true, message: 'Wellcome to Nike', newUser });
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'không có email or password ' });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: 'Sai email' });

        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) return res.status(400).json({ success: false, message: 'Sai passs' });

        const accessToken = jwt.sign({ user }, process.env.ACCESSTOKEN_SECRET);

        return res.status(200).json({ success: true, message: 'Login successssss', accessToken, user });
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.put('/update', async (req, res) => {
    const { name, email, userId, address, avatar, lastname } = req.body;
    if (!name || !email) return res.status(400).json({ success: false, message: 'Fall 62' });
    const checkUserId = await User.findOne({ userId });
    if (!checkUserId) return res.status(400).json({ success: false, message: 'sai mail rồi' });
    try {
        let updateUser = {
            avatar,
            name,
            lastname,
            email,
            address,
        };
        updateUser = await User.findByIdAndUpdate(userId, updateUser, { new: true });
        const user = await User.findOne({ email });
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESSTOKEN_SECRET);
        return res.status(200).json({ success: true, message: 'Success', accessToken, user });
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;
