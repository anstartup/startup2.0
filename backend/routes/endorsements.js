const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Notification = require('../models/Notification');
// Fetch endorsements for logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const endorsements = await Notification.find({ userId: req.user.id, type: 'endorsement' });
        res.json(endorsements);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching endorsements' });
    }
});

module.exports = router;
