const router = require("express").Router();
const authController = require("./auth.conroller.js");

router.post("/login", authController.loginController);

module.exports = router;