const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Job = require('../models/Job');
const Profile = require('../models/Profile');
const Notification = require('../models/Notification');

// Student Dashboard Data
router.get('/student', auth, async (req, res) => {
    try {
        if (req.user.type !== 'student') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const userId = req.user.id;
        
        // Get user profile
        const profile = await Profile.findOne({ userId });
        
        // Get job matches for this profile
        const jobMatches = await Job.find({
            'matches.profileId': profile?._id
        }).populate('recruiterId', 'name companyName');

        // Get recent notifications
        const notifications = await Notification.find({ userId })
            .sort({ createdAt: -1 })
            .limit(5);

        // Calculate profile completion percentage
        const profileFields = ['name', 'githubUrl', 'skills', 'bio'];
        const completedFields = profileFields.filter(field => profile?.[field] && profile[field].length > 0);
        const profileCompletion = Math.round((completedFields.length / profileFields.length) * 100);

        // Get skill analytics
        const allJobs = await Job.find({}).select('skills');
        const skillDemand = {};
        allJobs.forEach(job => {
            job.skills.forEach(skill => {
                skillDemand[skill] = (skillDemand[skill] || 0) + 1;
            });
        });

        const topSkills = Object.entries(skillDemand)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .map(([skill, count]) => ({ skill, demand: count }));

        res.json({
            profile: profile || {},
            profileCompletion,
            jobMatches: jobMatches.map(job => ({
                _id: job._id,
                title: job.title,
                companyName: job.recruiterId.companyName,
                recruiterName: job.recruiterId.name,
                skills: job.skills,
                budget: job.budget,
                duration: job.duration,
                matchScore: job.matches.find(m => m.profileId?.toString() === profile?._id?.toString())?.matchScore || 0
            })),
            notifications,
            analytics: {
                totalMatches: jobMatches.length,
                topSkills,
                profileViews: Math.floor(Math.random() * 50) + 10 // Placeholder
            }
        });
    } catch (error) {
        console.error('Student dashboard error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Recruiter Dashboard Data
router.get('/recruiter', auth, async (req, res) => {
    try {
        if (req.user.type !== 'recruiter') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const userId = req.user.id;
        
        // Get recruiter's jobs
        const jobs = await Job.find({ recruiterId: userId })
            .populate('matches.profileId', 'name skills bio anonymousId');

        // Get recent notifications
        const notifications = await Notification.find({ userId })
            .sort({ createdAt: -1 })
            .limit(5);

        // Calculate analytics
        const totalJobs = jobs.length;
        const totalMatches = jobs.reduce((sum, job) => sum + job.matches.length, 0);
        const averageMatchScore = jobs.reduce((sum, job) => {
            const jobAvg = job.matches.reduce((jobSum, match) => jobSum + (match.matchScore || 0), 0) / (job.matches.length || 1);
            return sum + jobAvg;
        }, 0) / (totalJobs || 1);

        // Get top skills from all job postings
        const allSkills = jobs.flatMap(job => job.skills);
        const skillCount = {};
        allSkills.forEach(skill => {
            skillCount[skill] = (skillCount[skill] || 0) + 1;
        });

        const topRequiredSkills = Object.entries(skillCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([skill, count]) => ({ skill, count }));

        res.json({
            jobs: jobs.map(job => ({
                _id: job._id,
                title: job.title,
                description: job.description,
                skills: job.skills,
                budget: job.budget,
                duration: job.duration,
                matchCount: job.matches.length,
                topMatches: job.matches
                    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
                    .slice(0, 3)
                    .map(match => ({
                        profileId: match.profileId?._id,
                        anonymousId: match.profileId?.anonymousId,
                        name: match.profileId?.name,
                        skills: match.profileId?.skills,
                        matchScore: match.matchScore,
                        bio: match.profileId?.bio
                    })),
                createdAt: job.createdAt
            })),
            notifications,
            analytics: {
                totalJobs,
                totalMatches,
                averageMatchScore: Math.round(averageMatchScore * 100) / 100,
                topRequiredSkills,
                activeJobsCount: jobs.filter(job => job.matches.length > 0).length
            }
        });
    } catch (error) {
        console.error('Recruiter dashboard error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
