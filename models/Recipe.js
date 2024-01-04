const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: false,
  },
  cloudinaryId: {
    type: String,
    require: false,
  },
  servings: {
    type: String,
    required: false,
  },
  prepTime: {
    type: String,
    required: false,
  },
  cookTime: {
    type: String,
    required: false,
  },
  totalTime: {
    type: String,
    required: false,
  },
  ingredients: {
    type: [],
    required: false,
  },
  method: {
    type: [],
    required: false,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
