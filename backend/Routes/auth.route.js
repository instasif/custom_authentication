const express = require("express");
const router = express.Router();
const authController = require("../Controllers/auth.controller");
const AuthValidation = require("../Middlewares/AuthValidation");

router.route("/signup").post(AuthValidation.signUpalidation, authController.signUpController);

router.route("/login").post(AuthValidation.logInvalidation, authController.logInController);

module.exports = router;
