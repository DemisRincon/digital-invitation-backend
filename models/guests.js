const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    guests: [String],
    state: {
        type: String,
        enum: ['created', 'accepted', 'declined'],
        default: 'created'
    },
    tableNumber: {
        type: Number,
    }
});

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;