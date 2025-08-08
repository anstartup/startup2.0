
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'skillexer_secret_key_2024';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// In-memory storage (replace with database in production)
const users = [];
const profiles = [];
const jobs = [];
const notifications = [];

// WebSocket connection handling
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    socket.on('join', (userId) => {
        socket.join(`user_${userId}`);
        console.log(`User ${userId} joined their notification room`);
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Auth middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Auth routes
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, type: user.type },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                type: user.type
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/auth/signup/student', async (req, res) => {
    try {
        const { name, email, password, githubUrl, skills, bio } = req.body;
        
        // Check if user exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user
        const user = {
            id: users.length + 1,
            name,
            email,
            password: hashedPassword,
            type: 'student',
            createdAt: new Date()
        };
        users.push(user);

        // Create student profile
        const profile = {
            id: profiles.length + 1,
            userId: user.id,
            name,
            githubUrl,
            skills,
            bio,
            projects: [],
            matches: [],
            anonymous: true,
            anonymousId: `AS${Math.floor(Math.random() * 999) + 1}`,
            createdAt: new Date()
        };
        profiles.push(profile);

        const token = jwt.sign(
            { id: user.id, email: user.email, type: user.type },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'Student profile created successfully',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                type: user.type
            },
            profile
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/auth/signup/recruiter', async (req, res) => {
    try {
        const { name, email, password, companyName, companySize, hiringFor } = req.body;
        
        // Check if user exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user
        const user = {
            id: users.length + 1,
            name,
            email,
            password: hashedPassword,
            type: 'recruiter',
            companyName,
            companySize,
            hiringFor,
            createdAt: new Date()
        };
        users.push(user);

        const token = jwt.sign(
            { id: user.id, email: user.email, type: user.type },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'Recruiter account created successfully',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                type: user.type,
                companyName: user.companyName
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Profile routes
app.get('/api/profiles/student', authenticateToken, (req, res) => {
    if (req.user.type !== 'student') {
        return res.status(403).json({ message: 'Access denied' });
    }

    const profile = profiles.find(p => p.userId === req.user.id);
    if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
});

app.put('/api/profiles/student', authenticateToken, (req, res) => {
    if (req.user.type !== 'student') {
        return res.status(403).json({ message: 'Access denied' });
    }

    const profileIndex = profiles.findIndex(p => p.userId === req.user.id);
    if (profileIndex === -1) {
        return res.status(404).json({ message: 'Profile not found' });
    }

    profiles[profileIndex] = { ...profiles[profileIndex], ...req.body, updatedAt: new Date() };
    res.json(profiles[profileIndex]);
});

// Job routes
app.post('/api/jobs', authenticateToken, (req, res) => {
    if (req.user.type !== 'recruiter') {
        return res.status(403).json({ message: 'Access denied' });
    }

    const { title, description, skills, duration, budget } = req.body;
    
    const job = {
        id: jobs.length + 1,
        recruiterId: req.user.id,
        title,
        description,
        skills,
        duration,
        budget,
        matches: [],
        createdAt: new Date()
    };
    
    // Simple matching algorithm
    const studentProfiles = profiles.filter(p => p.anonymous);
    job.matches = studentProfiles.filter(profile => 
        skills.some(skill => profile.skills.includes(skill))
    ).map(profile => ({
        profileId: profile.id,
        anonymousId: profile.anonymousId,
        matchScore: calculateMatchScore(profile.skills, skills),
        skills: profile.skills
    }));

    jobs.push(job);
    
    // Send notifications to matched students
    job.matches.forEach(match => {
        const profile = profiles.find(p => p.id === match.profileId);
        if (profile) {
            createNotification(
                profile.userId,
                'job_match',
                'New Job Match!',
                `A new ${title} position matches your skills with ${match.matchScore}% compatibility`,
                {
                    jobId: job.id,
                    jobTitle: title,
                    matchScore: match.matchScore,
                    skills: skills
                }
            );
        }
    });
    
    res.status(201).json(job);
});

app.get('/api/jobs', authenticateToken, (req, res) => {
    if (req.user.type === 'recruiter') {
        const recruiterJobs = jobs.filter(j => j.recruiterId === req.user.id);
        res.json(recruiterJobs);
    } else {
        // Students see all jobs
        res.json(jobs.map(job => ({
            id: job.id,
            title: job.title,
            description: job.description,
            skills: job.skills,
            duration: job.duration,
            createdAt: job.createdAt
        })));
    }
});

// Matching routes
app.get('/api/matches/student', authenticateToken, (req, res) => {
    if (req.user.type !== 'student') {
        return res.status(403).json({ message: 'Access denied' });
    }

    const profile = profiles.find(p => p.userId === req.user.id);
    if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
    }

    const matches = jobs.filter(job => 
        job.matches.some(match => match.profileId === profile.id)
    ).map(job => ({
        id: job.id,
        title: job.title,
        description: job.description,
        skills: job.skills,
        duration: job.duration,
        matchScore: job.matches.find(m => m.profileId === profile.id).matchScore
    }));

    res.json(matches);
});

// Helper functions
function calculateMatchScore(profileSkills, jobSkills) {
    const matchingSkills = profileSkills.filter(skill => jobSkills.includes(skill));
    return Math.round((matchingSkills.length / jobSkills.length) * 100);
}

function createNotification(userId, type, title, message, data = {}) {
    const notification = {
        id: notifications.length + 1,
        userId,
        type, // 'job_match', 'new_job', 'profile_view', etc.
        title,
        message,
        data,
        read: false,
        createdAt: new Date()
    };
    notifications.push(notification);
    
    // Send real-time notification
    io.to(`user_${userId}`).emit('notification', notification);
    
    return notification;
}

// Notification routes
app.get('/api/notifications', authenticateToken, (req, res) => {
    const userNotifications = notifications
        .filter(n => n.userId === req.user.id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json(userNotifications);
});

app.put('/api/notifications/:id/read', authenticateToken, (req, res) => {
    const notificationId = parseInt(req.params.id);
    const notification = notifications.find(n => n.id === notificationId && n.userId === req.user.id);
    
    if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
    }
    
    notification.read = true;
    res.json({ message: 'Notification marked as read' });
});

app.put('/api/notifications/mark-all-read', authenticateToken, (req, res) => {
    notifications
        .filter(n => n.userId === req.user.id)
        .forEach(n => n.read = true);
    
    res.json({ message: 'All notifications marked as read' });
});

// Stats endpoint
app.get('/api/stats', (req, res) => {
    const studentCount = users.filter(u => u.type === 'student').length;
    const recruiterCount = users.filter(u => u.type === 'recruiter').length;
    const jobCount = jobs.length;
    const matchCount = jobs.reduce((total, job) => total + job.matches.length, 0);

    res.json({
        students: studentCount,
        recruiters: recruiterCount,
        jobs: jobCount,
        matches: matchCount
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Skillexer backend running on port ${PORT}`);
});
