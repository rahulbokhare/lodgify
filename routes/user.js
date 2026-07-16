
const express = require("express")
const User = require("../models/user");
const router = express.Router();
const userController = require("../controllers/user");
const passport = require("passport");
const middleware = require("../middleware");

router.get("/signup", userController.getSignUp)
router.post("/signup", userController.postSingUp)


router.get("/login", userController.getLogin);
router.post("/login",passport.authenticate("local", {failureRedirect : "/login" , failureFlash: true}), userController.postLogin);

router.get("/logout", userController.logoutUser);

router.get("/profile", middleware.isLoggedIn, userController.profileRoute)
module.exports = router;