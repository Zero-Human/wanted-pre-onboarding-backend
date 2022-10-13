const Sequelize = require('sequelize');

module.exports = class Company extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id : {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(40),
                allowNull: true,
            },
            contry: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            region: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Company',
            tableName: 'companies',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Company.hasMany(db.Recruitment);
    }
};