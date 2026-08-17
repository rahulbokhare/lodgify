const express = require("express");
const Listing = require("../models/listing");
const router = express.Router();
const listingController = require("../controllers/listing");
const ExpressError = require("../utils/ExpressError");
const middleware = require("../middleware");
const { rulesForListing } = require("../schema");
const { storage } = require('../utils/cloudConfig')
const multer = require("multer");
const upload = multer({ storage });


//Index route
router.get("/", listingController.index);

//New Route
router.get("/new",middleware.isLoggedIn, listingController.newGet)
router.post("/new",  middleware.isLoggedIn, middleware.validateListing, upload.single("listing[image]"), listingController.newPost );

//show route
router.get("/:id", listingController.show);

//edit route
router.get("/:id/edit", middleware.isLoggedIn, middleware.isOwner, listingController.editGet)
router.put("/:id", middleware.isLoggedIn, middleware.isOwner, upload.single("listing[image]"), middleware.validateListing, listingController.editPut )

//delete route
router.delete("/:id", middleware.isLoggedIn,middleware.isOwner, listingController.deleteRoute )

module.exports = router; 