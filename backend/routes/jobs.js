const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Job = require('../models/Job');

module.exports = (io) => {
    // List jobs (simple public list)
    router.get('/', async (req, res) => {
        try {
            const jobs = await Job.find()
                .populate('recruiterId', 'name type')
                .sort({ createdAt: -1 })
                .limit(50);
            res.json({ jobs });
        } catch (e) {
            res.status(500).json({ message: 'Error fetching jobs' });
        }
    });

    // Create a job (recruiter only)
    router.post('/', auth, async (req, res) => {
        try {
            const { title, description, skills = [], duration, budget } = req.body;
            const job = await Job.create({
                recruiterId: req.user.id,
                title, description, skills, duration, budget,
            });
            io.emit('newJob', { id: job._id, title: job.title });
            res.status(201).json(job);
        } catch (e) {
            res.status(400).json({ message: 'Error creating job', error: e.message });
        }
    });

    // Backward-compatible: POST /api/jobs/create
    router.post('/create', auth, async (req, res) => {
        try {
            const { title, description, skills = [], duration, budget } = req.body;
            const job = await Job.create({
                recruiterId: req.user.id,
                title, description, skills, duration, budget,
            });
            io.emit('newJob', { id: job._id, title: job.title });
            res.status(201).json(job);
        } catch (e) {
            res.status(400).json({ message: 'Error creating job', error: e.message });
        }
    });

    // Delete a job (owner only)
    router.delete('/:id', auth, async (req, res) => {
        try {
            const job = await Job.findOneAndDelete({ _id: req.params.id, recruiterId: req.user.id });
            if (!job) return res.status(404).json({ message: 'Job not found' });
            res.json({ ok: true });
        } catch (e) {
            res.status(400).json({ message: 'Error deleting job' });
        }
    });

    return router;
};