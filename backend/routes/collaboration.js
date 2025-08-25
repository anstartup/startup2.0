const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Notification = require('../models/Notification');
// Fetch collaboration requests for logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const requests = await Notification.find({ userId: req.user.id, type: 'collaboration' });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching collaboration requests' });
    }
});

// Create a collaboration request (admin/dev seeding)
router.post('/', auth, async (req, res) => {
    try {
        const { userId = req.user.id, title = 'Collaboration Request', message = 'Let\'s build together!', data = {} } = req.body;
        const item = await Notification.create({ userId, type: 'collaboration', title, message, data });
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: 'Error creating collaboration request' });
    }
});

module.exports = router;
