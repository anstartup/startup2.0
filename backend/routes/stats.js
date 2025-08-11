const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Job = require('../models/Job');

router.get('/', async (req, res) => {
    try {
        const studentCount = await User.countDocuments({ type: 'student' });
        const recruiterCount = await User.countDocuments({ type: 'recruiter' });
        
        // This is a placeholder for successful matches. You would implement this logic based on your app's flow.
        const matchCount = 20 + studentCount; // Dummy value

        res.json({
            students: studentCount,
            recruiters: recruiterCount,
            matches: matchCount
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;