const { Sequelize } = require('sequelize');

const sequelize = new Sequelize( DB_NAME,DB_USER, DB_PW, {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    decimalNumbers: true,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;