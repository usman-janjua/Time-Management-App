const Worklog = require("../models/worklog.model");
const ObjectId = require('mongoose').Types.ObjectId;
const httpError = require("http-errors");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/jwt.auth");
const userData = require("../helpers/user");
const {worklogSchema, worklogFilter} = require('../validations/worklog.validate')
const _ = require('underscore');

//create worklog
exports.create = [auth,
    async (req, res, next) => {
        try {
            const validationResult = worklogSchema.validate(req.body, {abortEarly: false});
            if (!_.isEmpty(validationResult.error)) {
                let _errors = [];
                validationResult.error.details.forEach((element) => {
                    _errors.push(element.message);
                });
                res.status(422).send({
                    errors: _errors
                });
            } else {
                const user = userData.user(req.headers.authorization);
                //store worklog
                const worklog = new Worklog({
                    hours: req.body.hours,
                    date: req.body.date,
                    note: req.body.note,
                    user: user._id
                })
                const result = await worklog.save();
                res.status(200).send({
                    message: "Worklog has been Created",
                    user: result
                });
            }
        } catch (error) {
            next(new httpError(500, {
                message: error.message
            }));
        }
    }
];
//update worklog
exports.edit = [auth,
    async (req, res, next) => {
        try {
            const validationResult = worklogSchema.validate(req.body, {abortEarly: false});
            if (!_.isEmpty(validationResult.error)) {
                let _errors = [];
                validationResult.error.details.forEach((element) => {
                    _errors.push(element.message);
                });
                res.status(422).send({
                    errors: _errors
                });
            } else if (!ObjectId.isValid(req.params.id)) {
                next(new httpError(200, {
                    message: 'Worklog id is invalid'
                }))
            } else {
                const user = userData.user(req.headers.authorization);
                const foundWorklog = await Worklog.findByIdAndUpdate({_id: req.params.id}, {
                    hours: req.body.hours,
                    date: req.body.date,
                    note: req.body.note,
                })
                if (foundWorklog) {
                    res.status(200).send({
                        message: "Worklog has been Updated",
                    });
                } else {
                    res.status(200).send({
                        message: "Worklog has not been Found",
                    });
                }
            }

        } catch (error) {
            next(new httpError(500, {
                message: error.message
            }));
        }
    }
];
//worklog index
exports.index = [auth,
    async (req, res, next) => {
        try {
            const user = userData.user(req.headers.authorization);
            const result = await Worklog.aggregate()
                .match({
                    user: ObjectId(user._id)
                })
                .project({
                    "_id": 1,
                    "hours": 1,
                    "date": 1,
                    "note": 1,
                    "createdAt": 1,
                    "updatedAt": 1
                });
            res.send({
                worklogs: result
            });
        } catch (error) {
            next(new httpError(500, {
                message: error.message
            }));
        }
    }
];
//get single worklog
exports.find = [
    async (req, res, next) => {
        try {
            const user = userData.user(req.headers.authorization);
            const result = await Worklog.aggregate()
                .match({
                    _id: ObjectId(req.params.id),
                    user: ObjectId(user._id)
                }).project({
                    "_id": 1,
                    "hours": 1,
                    "date": 1,
                    "note": 1,
                    "createdAt": 1,
                    "updatedAt": 1
                });
            res.status(200).send({
                worklog: result
            });
        } catch (error) {
            next(new httpError(500, {
                message: error.message
            }));
        }
    }
];
//filter worklog
exports.filterworklog = [auth,
    async (req, res, next) => {
        console.log(new Date(req.body.start_date));
        try {
            const validationResult = worklogFilter.validate(req.body, {abortEarly: false});
            if (!_.isEmpty(validationResult.error)) {
                let _errors = [];
                validationResult.error.details.forEach((element) => {
                    _errors.push(element.message);
                });
                res.status(422).send({
                    errors: _errors
                });
            } else {
                const user = userData.user(req.headers.authorization);
                const result = await Worklog.aggregate()
                    .match({
                        user: ObjectId(user._id),
                        date: {
                            $gte: new Date(req.body.start_date),
                            $lt: new Date(req.body.end_date),
                        }
                    }).project({
                        "_id": 1,
                        "hours": 1,
                        "date": 1,
                        "note": 1,
                        "createdAt": 1,
                        "updatedAt": 1
                    });
                console.log(result)
                res.status(200).send({
                    worklogs: result
                });
            }
        } catch (error) {
            next(new httpError(500, {
                message: error.message
            }));
        }
    }
];
//delete worklog
exports.delete = [auth,
    async (req, res, next) => {
        try {
            const user = userData.user(req.headers.authorization);
            let result = await Worklog.findByIdAndDelete({
                user: ObjectId(user._id),
                _id: ObjectId(req.params.id)
            });
            if (result) {
                res.status(200).send({
                    user: result,
                    message: "The Worklog has been deleted"
                });
            } else {
                res.status(409).send({
                    user: result,
                    message: "The Worklog has not been deleted"
                });
            }

        } catch
            (error) {
            next(new httpError(500, {
                message: error
            }));
        }
    }
];
