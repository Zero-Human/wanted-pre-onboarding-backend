const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const { sequelize } = require('./models');
const app = express();

app.set('port', process.env.PORT || 8002);

sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(routes);


module.exports = app;