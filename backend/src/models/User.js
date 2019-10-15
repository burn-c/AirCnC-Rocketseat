const mongoose = require('mongoose');

// esquema do usuários (campos)
const UserSchema = new mongoose.Schema({
    email: String,
});

module.exports = mongoose.model('User', UserSchema);
