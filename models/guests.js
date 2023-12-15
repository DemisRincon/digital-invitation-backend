const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    guests: [String],
    accepted: {
        type: Boolean,
        default: false
    },
    tableNumber: {
        type: Number,
    }
});

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;