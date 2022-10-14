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
                allowNull: false,
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
            underscored: true,
            modelName: 'Company',
            tableName: 'companies',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Company.hasMany(db.Recruitment,{foreignKey:{ name: "company_id", allowNull: false} , sourceKey:"id"});
    }
};