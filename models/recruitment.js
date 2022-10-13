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
                type: Sequelize.INTEGER,
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
            timestamps: false,
            underscored: true,
            modelName: 'Recruitment',
            tableName: 'recruitments',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Recruitment.hasMany(db.Application,{foreignKey: "recruitment_id", sourceKey:"id"});
        db.Recruitment.belongsTo(db.Company,{foreignKey: "company_id" , targetKey:"id"});
    }
};