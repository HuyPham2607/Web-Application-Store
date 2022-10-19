const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String },
    lastname: { type: String },
    email: { type: String, require: true, unique: true },
    address: { type: String },
    avatar: { type: String },
    password: { type: String, require: true },
    confirmpassword: { type: String, require: true },
    isadmin: { type: Boolean, default: false },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', UserSchema);
