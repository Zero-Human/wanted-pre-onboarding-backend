const Sequelize = require('sequelize');
const User = require('./user');
const Company = require('./company');
const Recruitment = require('./recruitment');
const config = require('../config/config')["development"];


const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Company = Company;
db.Recruitment = Recruitment;

User.init(sequelize);
Company.init(sequelize);
Recruitment.init(sequelize);


User.associate(db);
Company.associate(db);
Recruitment.associate(db);

module.exports = db;