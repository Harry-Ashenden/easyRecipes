const cloudinary = require("../middleware/cloudinary");
const Recipe = require("../models/Recipe");
const Comment = require("../models/Comment");
const axios = require("axios");
const flash = require('express-flash');

module.exports = {
  getProfile: async (req, res) => {
    try {
      const recipes = await Recipe.find({ user: req.user.id });
      res.render("profile.ejs", { recipes: recipes, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getAddRecipe: async (req, res) => {
    try {
      const recipes = await Recipe.find({ user: req.user.id });
      res.render("addRecipe.ejs", { recipes: recipes, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const recipes = await Recipe.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { recipes: recipes });
    } catch (err) {
      console.log(err);
    }
  },
  getRecipe: async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      const comments = await Comment.find({recipe: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("recipe.ejs", { recipe: recipe, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },

  createRecipe: async (req, res) => {
    try {
      console.log(req.file)
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {folder: "easyRecipes"});

      await Recipe.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        servings: req.body.servings,
        cookTime: req.body.cookTime,
        prepTime: req.body.prepTime,
        totalTime: req.body.totalTime,
        ingredients: req.body.ingredients.split("\n"),
        method: req.body.method.split("\n"),
        likes: 0,
        user: req.user.id,
      });
      console.log("Recipe has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  createRecipeUrl: async (req, res) => {
    try {

      let recipeUrlApi = {
        method: 'GET',
        url: 'https://cookr-recipe-parser.p.rapidapi.com/getRecipe',
        params: {
          source: req.body.recipeUrl
        },
        headers: {
          'content-type': 'text/plain',
          'X-RapidAPI-Key': process.env.RECIPE_URL_API,
          'X-RapidAPI-Host': 'cookr-recipe-parser.p.rapidapi.com'
        },
      };

      //Requesting data from recipeApi
      let response = await axios.request(recipeUrlApi);
      response = response.data.recipe

      // Upload image to cloudinary and changing data type if array
      let result
      if (Array.isArray(response.image) == true ){
        result = await cloudinary.uploader.upload(response.image.toString(), {folder: "easyRecipes"});
      } else {
        result = await cloudinary.uploader.upload(response.image, {folder: "easyRecipes"});
      }
      
      await Recipe.create({
        title: response.name,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        servings: response.recipeYield,
        cookTime: response.cookTime,
        prepTime: response.prepTime,
        totalTime: response.totalTime,
        ingredients: response.recipeIngredients,
        method: response.recipeInstructions,
        likes: 0,
        user: req.user.id,
      });
      console.log("Recipe has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
      console.log("Recipe unable to be added, please add manually")
      res.redirect("/urlRecipeFail");
    }
  },

  getFail: async (req, res) => {
    try {
      res.render("urlRecipeFail.ejs");
    } catch (err) {
      console.log(err);
    }
  },

  likeRecipe: async (req, res) => {
    try {
      await Recipe.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/recipe/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },

  getRecipeUpdate: async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      res.render("recipeUpdate.ejs", { recipe: recipe, user: req.user});
    }catch (err) {
      console.log(err);
    }
  },

  updateRecipe: async (req, res) => {
    try {
      console.log(req)
      console.log(req.body)
      console.log(req.file)
      // Get recipe id
      let recipe = await Recipe.findById({ _id: req.params.id });

      // // Delete image from cloudinary
      await cloudinary.uploader.destroy(recipe.cloudinaryId);

      // // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {folder: "easyRecipes"});

      // Update recipe
      await Recipe.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            title: req.body.title,
            image: result.secure_url,
            cloudinaryId: result.public_id,
            servings: req.body.servings,
            cookTime: req.body.cookTime,
            prepTime: req.body.prepTime,
            totalTime: req.body.totalTime,
            ingredients: req.body.ingredients.split("\n"),
            method: req.body.method.split("\n"),
            // likes: 0,
            // user: req.user.id,
          }
        }
      )
         
      // Redirect to recipe page
      console.log("Recipe has been edited!");
      res.redirect(`/recipe/${req.params.id}`);

    }catch (err) {
      console.log(err);
    }
  },

  deleteRecipe: async (req, res) => {
    try {
      // Find post by id
      let recipe = await Recipe.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(recipe.cloudinaryId);
      // Delete post from db
      await Recipe.deleteOne({ _id: req.params.id });
      console.log("Deleted Recipe");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};