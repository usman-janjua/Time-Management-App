const User = require("../models/user.model");
const Role = require("../models/role.model");
const ObjectId = require("mongoose").Types.ObjectId;
const httpError = require("http-errors");
const passwordHash = require("../helpers/password.hash");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/jwt.auth");
const admin = require("../middlewares/role");
const userData = require("../helpers/user");
const {
  authRegisterSchema,
  LoginSchema,
  authEditSchema,
  ChangePasswordSchema,
} = require("../validations/auth.validate");
const _ = require("underscore");
const role = require("../middlewares/role");

//register user
exports.register = async (req, res, next) => {
  try {
    const validationResult = authRegisterSchema.validate(req.body, {
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
      const emailExist = await User.findOne({ email: req.body.email });
      const roleExist = await Role.findOne({ _id: req.body.role });
      const usernameExist = await User.findOne({ username: req.body.username });
      if (emailExist)
        next(
          new httpError(422, {
            message: `This ${req.body.email} email is already been registered`,
          })
        );
      if (usernameExist)
        next(
          new httpError(422, {
            message: `This ${req.body.username} username is already been registered`,
          })
        );
      if (!roleExist)
        next(
          new httpError(422, {
            message: `This ${req.body.role} role is not found in record`,
          })
        );
      let hash = await passwordHash.hash(req.body.password);
      const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        password: hash,
      });
      const result = await user.save();
      res.status(200).send({
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
};

//login
exports.login = async (req, res, next) => {
  try {
    const validationResult = LoginSchema.validate(req.body, {
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
      const foundUser = await User.aggregate([
        {
          $match: {
            email: req.body.email,
          },
        },
        {
          $lookup: {
            from: "roles",
            localField: "role",
            foreignField: "_id",
            as: "role",
          },
        },
        {
          $unwind: "$role",
        },
        {
          $project: {
            _id: 1,
            name: 1,
            username: 1,
            "role._id": 1,
            "role.name": 1,
            email: 1,
            status: 1,
            password: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ]);

      if (!foundUser[0]) {
        next(new httpError(404, "User is not found in our system"));
      }
      //Compare password
      const hashCompare = await passwordHash.compare(
        req.body.password,
        foundUser[0].password
      );

      if (hashCompare) {
        //Check if user is active or suspended
        if (foundUser[0].status == "1") {
          let userData = {
            _id: foundUser[0]._id,
            name: foundUser[0].name,
            email: foundUser[0].email,
            username: foundUser[0].username,
            role_id: foundUser[0].role._id,
            role: foundUser[0].role.name,
            status: foundUser[0].status == "1" ? "Active" : "Suspended",
          };
          //Prepare JWT token for authentication
          const jwtPayload = userData;
          const jwtData = {
            expiresIn: process.env.JWT_TIMEOUT_DURATION,
          };
          const secret = process.env.JWT_SECRET;
          res.status(200).send({
            message: "Successfully Logged-In",
            token: jwt.sign(jwtPayload, secret, jwtData),
            token_type: "Bearer",
            expires: jwtData.expiresIn,
            user: userData,
          });
        } else {
          next(new httpError(400, "Your Account is not activated"));
        }
      }
      next(
        new httpError(401, {
          message: "Password or Email is not Correct",
        })
      );
    }
  } catch (error) {
    next(
      new httpError(500, {
        message: error.message,
      })
    );
  }
};
//getUsers only accessible by managers
exports.getUsersManager = [
  auth,
  role.manager,
  async (req, res, next) => {
    try {
      const user = userData.user(req.headers.authorization);
      const role = await Role.findOne({ name: "User" });
      const result = await User.aggregate([
        {
          $match: {
            role: ObjectId(role._id),
          },
        },
        {
          $lookup: {
            from: "roles",
            localField: "role",
            foreignField: "_id",
            as: "role",
          },
        },
        {
          $unwind: "$role",
        },
        {
          $project: {
            _id: 1,
            name: 1,
            username: 1,
            "role.name": 1,
            email: 1,
            status: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ]);
      res.send({
        users: result,
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
//getManagers only accessible by admin
exports.getManagersAdmin = [
  auth,
  role.admin,
  async (req, res, next) => {
    try {
      const role = await Role.findOne({ name: "Manager" });
      const result = await User.aggregate([
        {
          $match: {
            role: ObjectId(role._id),
          },
        },
        {
          $lookup: {
            from: "roles",
            localField: "role",
            foreignField: "_id",
            as: "role",
          },
        },
        {
          $unwind: "$role",
        },
        {
          $project: {
            _id: 1,
            name: 1,
            username: 1,
            "role.name": 1,
            email: 1,
            status: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ]);
      res.send({
        managers: result,
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
//getUsers only accessible by admin
exports.getUsersAdmin = [
  auth,
  role.admin,
  async (req, res, next) => {
    try {
      const role = await Role.findOne({ name: "User" });
      const result = await User.aggregate([
        {
          $match: {
            role: ObjectId(role._id),
          },
        },
        {
          $lookup: {
            from: "roles",
            localField: "role",
            foreignField: "_id",
            as: "role",
          },
        },
        {
          $unwind: "$role",
        },
        {
          $project: {
            _id: 1,
            name: 1,
            username: 1,
            "role.name": 1,
            email: 1,
            status: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ]);
      res.send({
        users: result,
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
//get single user
exports.find = [
  auth,
  async (req, res, next) => {
    try {
      const result = await User.aggregate([
        {
          $match: { _id: ObjectId(req.params.id) },
        },
        {
          $lookup: {
            from: "roles",
            localField: "role",
            foreignField: "_id",
            as: "role",
          },
        },
        {
          $unwind: "$role",
        },
        {
          $project: {
            _id: 1,
            name: 1,
            username: 1,
            "role.name": 1,
            email: 1,
            status: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ]);
      res.send({
        users: result,
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
exports.update = [
  auth,
  async (req, res, next) => {
    try {
      const validationResult = authEditSchema.validate(req.body, {
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
        let result = await User.findByIdAndUpdate(
          {
            _id: user._id,
          },
          {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
          }
        );
        res.status(200).send({
          message: "User Profile has been updated",
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
//edit by admin or manager
exports.edit = [
  auth,
  async (req, res, next) => {
    try {
      const validationResult = authEditSchema.validate(req.body, {
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
        console.log(_errors);
      } else {
        let result = await User.findByIdAndUpdate(
          {
            _id: req.params.id,
          },
          {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
          }
        );
        res.status(200).send({
          message: "User Profile has been updated",
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
//delete user
exports.delete = [
  auth,
  async (req, res, next) => {
    try {
      let result = await User.findByIdAndDelete({
        _id: req.params.id,
      });
      if (result) {
        res.status(200).send({
          role: result,
          message: "User has been deleted",
        });
      } else {
        res.status(409).send({
          role: result,
          message: "User has not been deleted",
        });
      }
    } catch (error) {
      next(
        new httpError(500, {
          message: error,
        })
      );
    }
  },
];
//getUsers with filter
async function getUsers(role) {
  try {
    const role = await Role.findOne({ name: role });
    const result = await User.aggregate([
      {
        $match: {
          role: ObjectId(role._id),
        },
      },
      {
        $lookup: {
          from: "roles",
          localField: "role",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $unwind: "$role",
      },
      {
        $project: {
          _id: 1,
          name: 1,
          username: 1,
          "role.name": 1,
          email: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);
    res.send({
      users: result,
    });
  } catch (error) {
    next(
      new httpError(500, {
        message: error.message,
      })
    );
  }
}
