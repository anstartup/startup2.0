const express = require('express');
const router = express.Router();

const Profile = require('../models/Profile');
// Aggregate trending skills from Profile model
router.get('/', async (req, res) => {
    try {
        const skills = await Profile.aggregate([
            { $unwind: '$skills' },
            { $group: { _id: '$skills', count: { $sum: 1 } } },
            { $project: { skill: '$_id', count: 1, _id: 0 } },
            { $sort: { count: -1 } }
        ]);
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching trending skills' });
    }
});

module.exports = router;
