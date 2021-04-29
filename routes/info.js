const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Info=require("../models/info");
const InfoRouter=express.Router();
InfoRouter.use(bodyParser.json());

InfoRouter.route("/")
.post((req,res,next)=>{
    console.log(req.body);
    Info.create(req.body)
    .then((info)=>{
    },(err)=>{
        res.json(err)
        next(err)})
    .catch((err)=>next(err));

    setTimeout(()=>{
        Info.find({})
        .then((infos)=>{
            res.statusCode=200;
            res.setHeader("Content-type","application/json");
            res.json(infos);
        },(err)=>next(err))
        .catch((err)=>next(err));
    },100)
  
  
})
.get((req,res,next)=>{ // Returns all images
    Info.find({})
    .then((infos)=>{
        res.statusCode=200;
        res.setHeader("Content-type","application/json");
        res.json(infos);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

InfoRouter.route("/delete/:infoid")
.delete((req,res,next)=>{
    Info.findByIdAndRemove(req.params.infoid)
    .then((resp)=>{
    },(err)=>next(err))
    .catch((err)=>next(err));
    
    setTimeout(()=>{
        Info.find({})
        .then((infos)=>{
            res.statusCode=200;
            res.setHeader("Content-type","application/json");
            res.json(infos);
        },(err)=>next(err))
        .catch((err)=>next(err));
    },300)
});

InfoRouter.route("/search/")
.get((req,res,next)=>{

            Info.find({})
    .then((infos)=>{
        res.statusCode=200;
        res.setHeader("Content-type","application/json");
        res.json(infos);
    },(err)=>next(err))
    .catch((err)=>next(err));

})

InfoRouter.route("/search/:searchexp")
.get((req,res,next)=>{

            Info.find({"label":{$regex:req.params.searchexp}})
    .then((infos)=>{
        res.statusCode=200;
        res.setHeader("Content-type","application/json");
        res.json(infos);
    },(err)=>next(err))
    .catch((err)=>next(err));

})
module.exports=InfoRouter;
