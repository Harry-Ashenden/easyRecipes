const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const recipesController = require("../controllers/recipes");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, recipesController.getProfile);
router.get("/feed", ensureAuth, recipesController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/urlRecipeFail", recipesController.getFail);
router.get("/addRecipe", ensureAuth, recipesController.getAddRecipe);

module.exports = router;
