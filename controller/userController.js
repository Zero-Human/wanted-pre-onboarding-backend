const express = require('express');
const router = express.Router();
const { User, Application, Recruitment } = require('../models');
const {Op} = require('sequelize');


router.post("/:id/apply", async(req,res,next)=>{ 
    const userId = req.params.id;
    const recruitmentId =  req.body.recruitmentId;
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
            if(created){
                res.status(201).json({ "message":"채용공고에 지원하였습니다." });
            }
            else{
                res.status(200).json({ "message":"지원했던 채용공고입니다." });
            }
        }).catch(e => {
            next(e);
        });
    }
});


module.exports = router;