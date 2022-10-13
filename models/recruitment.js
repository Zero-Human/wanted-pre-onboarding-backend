const Sequelize = require('sequelize');

module.exports = class Recruitment extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id : {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            position: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            reward: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            content: {
                type: Sequelize.STRING(1000),
                allowNull: false,
            },
            skil: {
                type: Sequelize.STRING(100),
                allowNull: false,
            }

        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Recruitment',
            tableName: 'recruitments',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Recruitment.belongsToMany(db.User,{through : "applay"});
        db.Recruitment.belongsTo(db.Company);
    }
};