const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    ID: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Name: { type: String, required: true },
    Address: { type: String, required: true },
    AnimalType: { type: String, required: true }
}, { collection: 'users' });

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
