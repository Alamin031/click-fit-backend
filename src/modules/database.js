const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('click_fit', 'root', 'alamin', {
  dialect: 'mysql',
  host: 'localhost'
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
