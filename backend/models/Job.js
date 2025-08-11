const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    anonymousId: { type: String },
    matchScore: { type: Number },
});

const JobSchema = new mongoose.Schema({
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    skills: [String],
    duration: { type: String },
    budget: { type: Number },
    matches: [MatchSchema],
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);