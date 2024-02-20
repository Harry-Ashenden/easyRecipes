const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const recipesController = require("../controllers/recipes");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes
router.get("/:id", ensureAuth, recipesController.getRecipe);
router.get("/addRecipe", recipesController.getAddRecipe);
router.post("/createRecipe", upload.single("file"), recipesController.createRecipe);
router.post("/createRecipeUrl", recipesController.createRecipeUrl);
router.get("/urlRecipeFail", recipesController.getFail);
router.put("/likeRecipe/:id", recipesController.likeRecipe);
router.get("/recipeUpdate/:id", recipesController.getRecipeUpdate);
router.post("/updateRecipe/:id", upload.single("file"), recipesController.updateRecipe);
router.delete("/deleteRecipe/:id", recipesController.deleteRecipe);

module.exports = router;
