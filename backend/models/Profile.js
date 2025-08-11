const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    githubUrl: { type: String },
    skills: [String],
    bio: { type: String },
    anonymousId: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);