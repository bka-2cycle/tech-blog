const User = require('./User');
const Comments = require('./Comments');
const Blogpost = require('./Blogpost');




User.hasMany(Blogpost, {
  foreignKey: 'userId',
});


Blogpost.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Blogpost.hasMany(Comments, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

User.hasMany(Comments, {
foreignKey: 'userId',
onDelete: 'CASCADE'
});

Comments.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});



module.exports = { User, Blogpost, Comments };
