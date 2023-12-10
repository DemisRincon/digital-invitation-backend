const express = require('express');
const router = express.Router();
const Guest = require('../../models/guests');

router.post('/addGuests', async (req, res, next) => {
    const newGuest = new Guest({
        guests: req.body.guests
    });

    try {
        await newGuest.save();
        res.status(201).json({ message: "Guests added successfully", data: newGuest });
    } catch (error) {
        next(error);
    }
});

router.get('/getGuests/:id', async (req, res, next) => {
    try {
        const guest = await Guest.findById(req.params.id);
        if (!guest) {
            return res.status(404).json({ message: "Guest not found" });
        }
        res.status(200).json(guest);
    } catch (error) {
        next(error);
    }
});

router.get('/getAllGuests', async (req, res, next) => {
    try {
        const guests = await Guest.find({});
        res.status(200).json(guests);
    } catch (error) {
        next(error);
    }
});

module.exports = router