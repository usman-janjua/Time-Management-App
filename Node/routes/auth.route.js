const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/getUsersManager", AuthController.getUsersManager);
router.get("/getUsersAdmin", AuthController.getUsersAdmin);
router.get("/getManagersAdmin", AuthController.getManagersAdmin);
router.get("/:id", AuthController.find);
router.put("/edit/user/:id", AuthController.edit);
router.put("/update", AuthController.update);
router.delete("/delete/:id", AuthController.delete);
// router.put("/changePassword", AuthController.changePassword);

module.exports = router;
