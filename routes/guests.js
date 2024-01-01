const express = require('express');
const router = express.Router();
const Guest = require('../models/guests');

router.post('/addGuests', async (req, res, next) => {
    const newGuest = new Guest({
        guests: req.body.guests,
        tableNumber: req.body.table
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

router.delete('/deleteGuest/:id', async (req, res, next) => {
    try {
        const guest = await Guest.findByIdAndDelete(req.params.id);
        if (!guest) {
            return res.status(404).json({ message: "Guest not found" });
        }
        res.status(200).json({ message: "Guest successfully deleted" });
    } catch (error) {
        next(error);
    }
});

router.get('/getAllGuests', async (req, res, next) => {
    try {
        const guests = await Guest.find({}).sort({ tableNumber: 1 });
        res.status(200).json(guests);
    } catch (error) {
        next(error);
    }
});

router.put('/update-accepted/:id', async (req, res) => {
    try {
        const guestId = req.params.id;
        const updatedGuest = await Guest.findByIdAndUpdate(
            guestId,
            { $set: { state: 'accepted' } },
            { new: true }
        );

        if (!updatedGuest) {
            return res.status(404).json({ message: 'Guest not found' });
        }

        return res.json(updatedGuest);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.put('/update-declined/:id', async (req, res) => {
    try {
        const guestId = req.params.id;
        const updatedGuest = await Guest.findByIdAndUpdate(
            guestId,
            { $set: { state: 'declined' } },
            { new: true }
        );

        if (!updatedGuest) {
            return res.status(404).json({ message: 'Guest not found' });
        }

        return res.json(updatedGuest);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.post('/create-several-guests', async (req, res) => {
    try {
        const guestArray = req.body; // Recibe el array de invitados desde la solicitud

        // Inserta el array de invitados en la base de datos
        const createdGuests = await Guest.create(guestArray);

        return res.status(201).json(createdGuests);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al crear invitados' });
    }
});

router.delete('/deleteAllGuests', async (req, res, next) => {
    try {
        await Guest.deleteMany({});
        res.status(200).json({ message: "All guests successfully deleted" });
    } catch (error) {
        next(error);
    }
});


module.exports = router