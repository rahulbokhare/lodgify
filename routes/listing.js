const express = require("express");
const Listing = require("../models/listing");
const router = express.Router();
const listingController = require("../controllers/listing");

//Index route
router.get("/", listingController.index);
//New Route
router.get("/new", listingController.newGet)
router.post("/new", listingController.newPost );
//show route
router.get("/:id", listingController.show);
//edit route
router.get("/:id/edit", listingController.editGet)
router.put("/:id", listingController.editPut )
//delete route
router.delete("/:id", listingController.deleteRoute )

module.exports = router;