const express = require('express');
const router = express.Router();
const { Application, Company, Recruitment } = require('../models');
const {Op} = require('sequelize');


router.post("/", async(req,res,next)=>{ 
    const {companyId,position,reward,content,skil} = req.body;
    if(!companyId || !position || !reward || !content || !skil){
        const error = new Error("Bad Request");
        error.status = 400;
        next(error);
    }
    else{
        Recruitment.create({
            "company_id":companyId,
            "position":position,
            "reward":reward,
            "content":content,
            "skil":skil
        }).then(()=>{
            res.status(201).json({ "message":"Created recruitment" });
        }).catch(e => {
            next(e);
        });
    }
});

router.get("/", async(req,res,next)=>{ 
    const search = req.query.search === undefined ? '' : req.query.search;
    Recruitment.findAll({
        include:[{
            model:Company
        }],
        where:{
            [Op.or]:[{
                    position:{[Op.like]:`%${search}%`}
                },{
                    skil:{[Op.like]:`%${search}%`}
                },{
                    '$Company.name$':{[Op.like]:`%${search}%`}
                }]
        }
    }).then((data)=>{
        if(data === null || data.length === 0){
            next();
        }
        else{
            res.status(200).json(data);
        }
    }).catch(e => {
        next(e);
    });
});

router.get("/:id", async(req,res,next)=>{ 
    const id = req.params.id;
    Recruitment.findOne({
            where: { id:id },
            include: [{
                    model: Company,
                    include: [{
                        attributes:['id'],
                        model: Recruitment,
                        where: { id: { [Op.ne]: id } },
                    }]
                }]
        }).then(async(data)=>{
        if(data === null || data.length === 0){
            next();
        }else{
            data
            console.log(data);
            res.status(200).json(data);
        }
    }).catch(e => {
        console.log(e);
        next(e);
    });
});

router.patch("/:id", async(req,res,next)=>{ 
    const {position,reward,content,skil} = req.body;
    const id = req.params.id;
    Recruitment.update({
        "position":position,
        "reward":reward,
        "content":content,
        "skil":skil
    },{
        where:{id:id}
    }).then((result)=>{
        console.log(result)
        if(!result[0]){
            next();
        }else{
            res.status(200).json({ "message":"Update recruitment" });
        }
    }).catch(e => {
        next(e);
    });
});

router.delete("/:id", async(req,res,next)=>{ 
    const id = req.params.id;
    Recruitment.destroy({
        where:{id:id}
    }).then((result)=>{
        if(!result){
            next();
        }else{
            res.status(200).json({ "message":"Delete recruitment" });
        }
    }).catch(e => {
        next(e);
    });
});

module.exports = router;