const express = require("express");


const middleware = require("../middleware");
const Review = require("../models/review");
const router = express.Router();
const reviewRouter = require("../controllers/review");


router.post("/home/:id/review", middleware.isLoggedIn, reviewRouter.postReview)


module.exports = router;