const Sequelize = require('sequelize');

module.exports = class Application extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'Application',
            tableName: 'applications',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Application.belongsTo(db.User,{foreignKey: "user_id", targetKey:"id"});
        db.Application.belongsTo(db.Recruitment,{foreignKey: "recruitment_id", targetKey:"id"});
    }
};