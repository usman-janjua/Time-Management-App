const Role = require("../models/role.model");
const ObjectId = require('mongoose').Types.ObjectId;
const httpError = require("http-errors");
const passwordHash = require("../helpers/password.hash");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/jwt.auth");
const role = require("../middlewares/role");
const userData = require("../helpers/user");
const {roleSchema} = require('../validations/role.validate');
const _ = require('underscore');

//index role
exports.index = [auth, role.admin,
    async (req, res, next) => {
        try {
            const result = await Role.aggregate()
                .project({
                    "_id": 1,
                    "name": 1,
                    "description": 1,
                    "createdAt": 1,
                    "updatedAt": 1
                });
            res.send({
                roles: result
            });
        } catch (error) {
            next(new httpError(500, {
                message: error.message
            }));
        }
    }
];
//single role
exports.find = [auth, role.admin,
    async (req, res, next) => {
        try {
            const result = await Role.find({_id: req.params.id}, {
                "_id": 1,
                "name": 1,
                "description": 1,
                "createdAt": 1,
                "updatedAt": 1
            })
            res.send({
                role: result
            });
        } catch (error) {
            next(new httpError(500, {
                message: error.message
            }));
        }
    }
];
//create role
exports.create = [auth, role.admin,
    async (req, res, next) => {
        try {
            const validationResult = roleSchema.validate(req.body, {abortEarly: false});
            if (!_.isEmpty(validationResult.error)) {
                let _errors = [];
                validationResult.error.details.forEach((element) => {
                    _errors.push(element.message);
                });
                res.status(422).send({
                    errors: _errors
                });
            } else {
                const nameExist = await Role.findOne({name: req.body.name})
                if (nameExist) {
                    next(new httpError(422, {
                        message: `This ${req.body.name} role is already exists in record`
                    }));
                }
                const role = new Role({
                    name: req.body.name,
                    description: req.body.description,
                })
                const result = await role.save();

                res.status(200).send({
                    message: "Role has been Created",
                    role: result
                });
            }

        } catch (error) {
            next(new httpError(500, {
                message: error
            }));
        }
    }
];
//edit role
exports.edit = [auth, role.admin,
    async (req, res, next) => {
        try {
            const validationResult = roleSchema.validate(req.body, {abortEarly: false});
            if (!_.isEmpty(validationResult.error)) {
                let _errors = [];
                validationResult.error.details.forEach((element) => {
                    _errors.push(element.message);
                });
                res.status(422).send({
                    errors: _errors
                });
            } else {

                const nameExist = await Role.findOne({name: req.body.name})
                if (nameExist) {
                    next(new httpError(422, {
                        message: `This ${req.body.name} role is already exists in record`
                    }));
                }
                const result = await Role.update({_id: req.params.id}, {
                    name: req.body.name,
                    description: req.body.description
                });
                if (result.isModified == 1) {
                    res.status(200).send({
                        message: "Role has been Updated",
                    });
                } else {
                    res.status(409).send({
                        message: "Role has not been Updated",
                    });
                }
            }

        } catch (error) {
            next(new httpError(500, {
                message: error
            }));
        }
    }
];
//delete role
exports.delete = [auth, role.admin,
    async (req, res, next) => {
        try {
            let result = await Role.findByIdAndDelete({
                _id: req.params.id
            });
            if (result) {
                res.status(200).send({
                    role: result,
                    message: "The Role has been deleted"
                });
            } else {
                res.status(409).send({
                    role: result,
                    message: "The Role has not been deleted"
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