// server.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const http = require('http');
const { Server } = require("socket.io");
const mongoose = require('mongoose');

// Import Mongoose Models
const User = require('./models/User');
const Profile = require('./models/Profile');
const Job = require('./models/Job');
const Notification = require('./models/Notification');


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Allow React dev server
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));


// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- WebSocket Connection ---
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    socket.on('join', (userId) => {
        socket.join(`user_${userId}`);
        console.log(`User with ID ${userId} joined room user_${userId}`);
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// --- Auth Middleware ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// --- Helper Functions ---
function calculateMatchScore(profileSkills, jobSkills) {
    const matchingSkills = profileSkills.filter(skill => jobSkills.includes(skill));
    return Math.round((matchingSkills.length / jobSkills.length) * 100);
}

async function createNotification(userId, type, title, message, data = {}) {
    const notification = await Notification.create({
        userId, type, title, message, data, read: false,
    });
    io.to(`user_${userId}`).emit('notification', notification);
    return notification;
}

// --- Routes ---

// Auth Routes
app.post('/api/auth/signup/student', async (req, res) => {
    try {
        const { name, email, password, githubUrl, skills, bio } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

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
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/auth/signup/recruiter', async (req, res) => {
     try {
        const { name, email, password, companyName, companySize, hiringFor } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const user = new User({ name, email, password, type: 'recruiter', companyName, companySize, hiringFor });
        await user.save();
        
        const token = jwt.sign({ id: user._id, name: user.name, type: user.type }, JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, type: user.type }});

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        
        const token = jwt.sign({ id: user._id, name: user.name, type: user.type }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, type: user.type } });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Job Routes
app.post('/api/jobs', authenticateToken, async (req, res) => {
    if (req.user.type !== 'recruiter') return res.status(403).json({ message: 'Access denied' });
    
    try {
        const { title, description, skills, duration, budget } = req.body;
        const job = new Job({ recruiterId: req.user.id, title, description, skills, duration, budget, matches: [] });
        
        // Matching Algorithm
        const studentProfiles = await Profile.find({ skills: { $in: skills } });
        job.matches = studentProfiles.map(profile => ({
            profileId: profile._id,
            anonymousId: profile.anonymousId,
            matchScore: calculateMatchScore(profile.skills, skills),
        }));
        
        await job.save();

        // Send notifications
        job.matches.forEach(match => {
            const profile = studentProfiles.find(p => p._id.equals(match.profileId));
            if (profile) {
                createNotification(
                    profile.userId, 'job_match', 'New Job Match!',
                    `A new ${title} position matches your skills with ${match.matchScore}% compatibility.`,
                    { jobId: job._id, jobTitle: title }
                );
            }
        });
        
        res.status(201).json(job);

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Notification Routes
app.get('/api/notifications', authenticateToken, async (req, res) => {
    const userNotifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(userNotifications);
});

app.put('/api/notifications/mark-all-read', authenticateToken, async (req, res) => {
    await Notification.updateMany({ userId: req.user.id, read: false }, { $set: { read: true } });
    res.json({ message: 'All notifications marked as read' });
});


// Stats Route
app.get('/api/stats', async (req, res) => {
    const studentCount = await User.countDocuments({ type: 'student' });
    const recruiterCount = await User.countDocuments({ type: 'recruiter' });
    const matchCount = await Job.aggregate([ { $unwind: "$matches" }, { $count: "totalMatches" }]);

    res.json({
        students: studentCount,
        recruiters: recruiterCount,
        matches: matchCount.length > 0 ? matchCount[0].totalMatches : 0,
    });
});

// --- Server Listen ---
server.listen(PORT, () => {
    console.log(`Skillexer backend running on http://localhost:${PORT}`);
});