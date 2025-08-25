const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Profile = require('../models/Profile');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

// Student Signup
router.post('/signup/student', async (req, res) => {
    try {
        const { name, email, password, githubUrl, skills, bio } = req.body;
        if (await User.findOne({ email })) {
            return res.status(400).json({ message: 'An account with this email already exists.' });
        }

        const user = new User({ name, email, password, type: 'student' });
        await user.save();

        const profile = new Profile({
            userId: user._id, name, githubUrl, skills, bio,
            anonymousId: `AS${Math.floor(Math.random() * 999) + 100}`
        });
        await profile.save();

        const token = jwt.sign({ id: user._id, name: user.name, type: user.type }, JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, type: user.type }});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during student signup.' });
    }
});

// Recruiter Signup
router.post('/signup/recruiter', async (req, res) => {
      try {
          const { name, email, password, companyName, companySize, hiringFor } = req.body;
        if (await User.findOne({ email })) {
            return res.status(400).json({ message: 'An account with this email already exists.' });
        }

          const user = new User({ name, email, password, type: 'recruiter', companyName, companySize, hiringFor });
        await user.save();
        
        const token = jwt.sign({ id: user._id, name: user.name, type: user.type }, JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, type: user.type }});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during recruiter signup.' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password.' });
        
        const token = jwt.sign({ id: user._id, name: user.name, type: user.type }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, type: user.type } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login.' });
    }
});

module.exports = router;