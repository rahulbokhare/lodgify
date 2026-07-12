const express = require("express");
const Listing = require("../models/listing");
const router = express.Router();
const listingController = require("../controllers/listing");
const ExpressError = require("../utils/ExpressError");
const middleware = require("../middleware");
const { rulesForListing } = require("../schema")

//Index route
router.get("/", listingController.index);
//New Route
router.get("/new",middleware.isLoggedIn, listingController.newGet)
router.post("/new", middleware.validateListing, listingController.newPost );
//show route
router.get("/:id", listingController.show);
//edit route
router.get("/:id/edit",middleware.isLoggedIn,middleware.isOwner, listingController.editGet)
router.put("/:id",middleware.validateListing,middleware.isOwner, listingController.editPut )
//delete route
router.delete("/:id", middleware.isLoggedIn,middleware.isOwner, listingController.deleteRoute )

module.exports = router; 