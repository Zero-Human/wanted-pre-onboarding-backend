const express = require('express');
const router = express.Router();
const { User, Application, Recruitment } = require('../models');
const {Op} = require('sequelize');


router.post("/:id/apply", async(req,res,next)=>{ 
    const userId = req.params.id;
    const recruitmentId =  req.body.recruitmentId;
    console.log("123");
    if(!recruitmentId){
        const error = new Error("Bad Request");
        error.status = 400;
        next(error);
    }
    else if(!userId){
        next();
    }
    else{
        Application.findOrCreate({
            where:{recruitment_id:recruitmentId,user_id:userId}
        }).then(([data,created])=>{
            console.log(created);
            res.status(200).json({ "message":"Apply recruitment" });
        }).catch(e => {
            next(e);
        });
    }
});


module.exports = router;