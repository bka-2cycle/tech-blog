const sequelize = require('../config/connection');
const { User, Blogpost, Comments } = require('../models');

const userData = require('./userData.json');
const blogpostData = require('./blogpostData.json');
const commentsData = require('./commentsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blogpost of blogpostData) {
    await Blogpost.create({
      ...blogpost,
    
    });
  }
// my code__________________________________________________
    for (const comments of commentsData) {
      await Comments.create({
        ...comments,
      
      });
  }

  process.exit(0);
};

seedDatabase();
