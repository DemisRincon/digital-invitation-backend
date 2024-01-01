const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    guests: [String],
    state: {
        type: String,
        enum: ['created', 'accepted', 'declined'],
        default: 'created'
    },
    tableNumber: Number
}, {
    toJSON: { virtuals: true }, // Ensure virtual fields are included when converting to JSON
    toObject: { virtuals: true }
});

// Virtual field for profileLink
guestSchema.virtual('profileLink').get(function () {
    return `https://bodakassydemis.netlify.app/${this._id}`;
});

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;