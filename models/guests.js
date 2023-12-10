const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    guests: [String]
});

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;