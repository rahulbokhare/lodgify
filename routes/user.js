
const express = require("express")
const User = require("../models/user");
const router = express.Router();
const userController = require("../controllers/user");
const passport = require("passport");
const middleware = require("../middleware");
const multer = require("multer");
const {storage} = require("../utils/cloudConfig");
const upload = multer({ storage });

router.get("/signup", userController.getSignUp)
router.post("/signup",upload.single("user[profilePic]"), userController.postSingUp)


router.get("/login", userController.getLogin);
router.post("/login",passport.authenticate("local", {failureRedirect : "/login" , failureFlash: true}), userController.postLogin);

router.get("/logout", userController.logoutUser);

router.get("/profile", middleware.isLoggedIn, userController.profileRoute);

router.get("/editProfile", middleware.isLoggedIn, userController.getEditProfile);
router.put("/editProfile", middleware.isLoggedIn, upload.single("user[profilePic]"), userController.putEditProfile);

module.exports = router;