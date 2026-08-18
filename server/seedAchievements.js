const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Achievement = require('./models/Achievement');

dotenv.config();

connectDB();

const achievements = [
  { title: "Novice", description: "Reached Level 10 in GK mastery.", levelRequired: 10, badgeImage: "https://cdn-icons-png.flaticon.com/512/3176/3176294.png" },
  { title: "Beginner", description: "Reached Level 20 in GK mastery.", levelRequired: 20, badgeImage: "https://cdn-icons-png.flaticon.com/512/3176/3176302.png" },
  { title: "Apprentice", description: "Reached Level 30 in GK mastery.", levelRequired: 30, badgeImage: "https://cdn-icons-png.flaticon.com/512/3176/3176309.png" },
  { title: "Competent", description: "Reached Level 40 in GK mastery.", levelRequired: 40, badgeImage: "https://cdn-icons-png.flaticon.com/512/3176/3176317.png" },
  { title: "Pro", description: "Reached Level 50 in GK mastery.", levelRequired: 50, badgeImage: "https://cdn-icons-png.flaticon.com/512/3176/3176326.png" },
  { title: "Expert", description: "Reached Level 60 in GK mastery.", levelRequired: 60, badgeImage: "https://cdn-icons-png.flaticon.com/512/3176/3176332.png" },
  { title: "Master", description: "Reached Level 70 in GK mastery.", levelRequired: 70, badgeImage: "https://cdn-icons-png.flaticon.com/512/3176/3176338.png" },
  { title: "Grandmaster", description: "Reached Level 80 in GK mastery.", levelRequired: 80, badgeImage: "https://cdn-icons-png.flaticon.com/512/3176/3176346.png" },
  { title: "Legend", description: "Reached Level 90 in GK mastery.", levelRequired: 90, badgeImage: "https://cdn-icons-png.flaticon.com/512/3176/3176352.png" },
  { title: "GK God", description: "Reached the legendary Level 100 in GK mastery.", levelRequired: 100, badgeImage: "https://cdn-icons-png.flaticon.com/512/3176/3176358.png" },
];

const importAchievements = async () => {
  try {
    // Delete only level-based achievements so we don't destroy custom ones
    await Achievement.deleteMany({ levelRequired: { $exists: true } });
    await Achievement.insertMany(achievements);
    console.log('Achievements Imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with achievements import: ${error}`);
    process.exit(1);
  }
};

importAchievements();
