require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Job = require('../models/Job');
const Notification = require('../models/Notification');

async function main() {
  try {
    if (!process.env.MONGO_URI) throw new Error('Missing MONGO_URI');
    await mongoose.connect(process.env.MONGO_URI);

    // Upsert a student user
    const studentEmail = 'student@example.com';
    let student = await User.findOne({ email: studentEmail });
    if (!student) {
      student = await User.create({
        name: 'Demo Student',
        email: studentEmail,
        password: 'password123',
        type: 'student',
      });
      console.log('Created student user');
    } else {
      console.log('Student user exists');
    }

    // Upsert a recruiter user
    const recruiterEmail = 'recruiter@example.com';
    let recruiter = await User.findOne({ email: recruiterEmail });
    if (!recruiter) {
      recruiter = await User.create({
        name: 'Demo Recruiter',
        email: recruiterEmail,
        password: 'password123',
        type: 'recruiter',
        companyName: 'Skillexer Inc',
        companySize: '51-200',
        hiringFor: 'Frontend Team',
      });
      console.log('Created recruiter user');
    } else {
      console.log('Recruiter user exists');
    }

    // Ensure a profile for the student
    let profile = await Profile.findOne({ userId: student._id });
    if (!profile) {
      profile = await Profile.create({
        userId: student._id,
        name: student.name,
        githubUrl: 'https://github.com/demo',
        skills: ['React', 'Node.js', 'UI/UX'],
        bio: 'Aspiring full-stack dev who loves clean UI and fast APIs.',
        anonymousId: 'anon-demo-001',
      });
      console.log('Created demo profile');
    } else {
      console.log('Profile exists');
    }

    // Ensure at least one job from recruiter
    let job = await Job.findOne({ recruiterId: recruiter._id, title: 'Frontend Engineer (React)' });
    if (!job) {
      job = await Job.create({
        recruiterId: recruiter._id,
        title: 'Frontend Engineer (React)',
        description: 'Build dashboards and components.',
        skills: ['React', 'JavaScript', 'CSS'],
        duration: 'Full-time',
        budget: 0,
      });
      console.log('Created demo job');
    } else {
      console.log('Job exists');
    }

    // Add a couple of notifications for endorsements and collaboration to the student
    const existingEnd = await Notification.findOne({ userId: student._id, type: 'endorsement' });
    if (!existingEnd) {
      await Notification.create({
        userId: student._id,
        type: 'endorsement',
        title: 'Endorsement: React',
        message: 'Peers endorsed you for React skills',
        data: { skill: 'React', endorsements: 3 },
      });
      console.log('Created endorsement notification');
    } else {
      console.log('Endorsement exists');
    }

    const existingCollab = await Notification.findOne({ userId: student._id, type: 'collaboration' });
    if (!existingCollab) {
      await Notification.create({
        userId: student._id,
        type: 'collaboration',
        title: 'Collaboration Request',
        message: "Let's build together!",
        data: { from: 'Demo User', project: 'Open Source UI Kit' },
      });
      console.log('Created collaboration notification');
    } else {
      console.log('Collaboration exists');
    }

    console.log('Seed complete.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
}

main();
