const Setting = require("../models/setting.model");
const ObjectId = require("mongoose").Types.ObjectId;
const httpError = require("http-errors");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/jwt.auth");
const userData = require("../helpers/user");
const { settingSchema } = require("../validations/setting.validate");
const _ = require("underscore");
const Worklog = require("../models/worklog.model");

//setting index
exports.index = [
  auth,
  async (req, res, next) => {
    try {
      const user = userData.user(req.headers.authorization);
      const result = await Setting.findOne(
        { user: ObjectId(user._id) },
        { _id: 1, hours: 1, createdAt: 1, updatedAt: 1 }
      );
      res.send({
        setting: result,
      });
    } catch (error) {
      next(
        new httpError(500, {
          message: error.message,
        })
      );
    }
  },
];

//create setting
exports.create = [
  auth,
  async (req, res, next) => {
    try {
      const validationResult = settingSchema.validate(req.body, {
        abortEarly: false,
      });
      if (!_.isEmpty(validationResult.error)) {
        let _errors = [];
        validationResult.error.details.forEach((element) => {
          _errors.push(element.message);
        });
        res.status(422).send({
          errors: _errors,
        });
      } else {
        const user = userData.user(req.headers.authorization);
        //store setting
        const setting = new Setting({
          hours: req.body.hours,
          user: user._id,
        });
        const result = await setting.save();
        res.status(200).send({
          message: "Your Preferred Working Hours Setting has created",
          user: result,
        });
      }
    } catch (error) {
      next(
        new httpError(500, {
          message: error.message,
        })
      );
    }
  },
];
//update setting
exports.edit = [
  auth,
  async (req, res, next) => {
    try {
      const validationResult = settingSchema.validate(req.body, {
        abortEarly: false,
      });
      if (!_.isEmpty(validationResult.error)) {
        let _errors = [];
        validationResult.error.details.forEach((element) => {
          _errors.push(element.message);
        });
        res.status(422).send({
          errors: _errors,
        });
      } else if (!ObjectId.isValid(req.params.id)) {
        next(
          new httpError(200, {
            message: "Setting id is invalid",
          })
        );
      } else {
        const user = userData.user(req.headers.authorization);
        const setting = await Setting.findOneAndUpdate(
          { _id: req.params.id, user: user._id },
          {
            hours: req.body.hours,
          }
        );
        if (setting) {
          res.status(200).send({
            message: "Your Preferred Working Hours Setting has Updated",
          });
        } else {
          res.status(200).send({
            message: "Your Preferred Working Hours Setting has not been Found",
          });
        }
      }
    } catch (error) {
      next(
        new httpError(500, {
          message: error.message,
        })
      );
    }
  },
];
