const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        id : {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING(40),
            allowNull: false,
            unique: true,
        },
        nick: {
            type: Sequelize.STRING(15),
            allowNull: false,
        },
    }, {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'User',
        tableName: 'users',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Application,{foreignKey: { name : "user_id", allowNull: false }, sourceKey:"id"});
  }
};