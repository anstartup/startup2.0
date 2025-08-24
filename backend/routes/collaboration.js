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

module.exports = router;
