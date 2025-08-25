const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Notification = require('../models/Notification');
// Fetch endorsements for logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const endorsements = await Notification.find({ userId: req.user.id, type: 'endorsement' });
        res.json(endorsements || []);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching endorsements' });
    }
});

// Create an endorsement for a user (admin/dev seeding)
router.post('/', auth, async (req, res) => {
    try {
        const { userId = req.user.id, title = 'Endorsement', message = 'Great work!', data = {} } = req.body;
        const item = await Notification.create({ userId, type: 'endorsement', title, message, data });
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: 'Error creating endorsement' });
    }
});

module.exports = router;
