const express = require('express');
const router = express.Router();
const recruitmentController = require('../controller/recruitmentController');
const userController = require('../controller/userController');

router.use("/recruitments",recruitmentController);
router.use("/users",userController);


router.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 주소가 없습니다.`);
    error.status = 404;
    next(error);
});

router.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        "code":err.status,
        "message":err.message
    });
});


module.exports = router;