require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_URL || "http://localhost:3000", "http://localhost:3001"],
        methods: ["GET", "POST", "PUT"]
    }
});

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
  });

// --- Socket.IO Connection ---
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

// --- API Routes ---

const authRoutes = require('./routes/auth');
const notificationRoutes = require('./routes/notifications');
const statsRoutes = require('./routes/stats');
const jobRoutes = require('./routes/jobs')(io); // Pass the `io` instance to the routes
const endorsementsRoutes = require('./routes/endorsements');
const collaborationRoutes = require('./routes/collaboration');
const skillsRoutes = require('./routes/skills');

app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/endorsements', endorsementsRoutes);
app.use('/api/collaboration', collaborationRoutes);
app.use('/api/skills', skillsRoutes);

// --- Start Server ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Skillexer backend running on http://localhost:${PORT}`);
});