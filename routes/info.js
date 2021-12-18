const express = require('express');
const bodyParser = require('body-parser');
const Info = require("../models/info");
const InfoRouter = express.Router();

// Adds new Image Post to database
InfoRouter.route("/")
    .post((req, res, next) => {
        Info.create(req.body)
            .then((info) => {}, (err) => {
                res.json(err)
                next(err)
            })
            .catch((err) => next(err));

        setTimeout(() => {
            Info.find({})
                .then((infos) => {
                    res.statusCode = 200;
                    res.setHeader("Content-type", "application/json");
                    res.json(infos);
                }, (err) => next(err))
                .catch((err) => next(err));
        }, 100)


    })
    .get((req, res, next) => { // Returns all images

        let { searchexp } = req.query;

        Info.find({ "label": { $regex: searchexp, $options: 'i' } })
            .then((infos) => {
                res.statusCode = 200;
                res.setHeader("Content-type", "application/json");
                res.json(infos);
            }, (err) => next(err))
            .catch((err) => next(err));


    })

InfoRouter.route("/:infoid")
    .delete((req, res, next) => {
        Info.findByIdAndRemove(req.params.infoid)
            .then((resp) => {}, (err) => next(err))
            .catch((err) => next(err));

        setTimeout(() => {
            Info.find({})
                .then((infos) => {
                    res.statusCode = 200;
                    res.setHeader("Content-type", "application/json");
                    res.json(infos);
                }, (err) => next(err))
                .catch((err) => next(err));
        }, 300)
    });


module.exports = InfoRouter;