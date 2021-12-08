const express = require('express');
const RecipesRoutes = express.Router();
const recipesController = require('../controllers/recipeController');

RecipesRoutes.get('/search/:userId', recipesController.getByUser);

RecipesRoutes.post('/post', recipesController.createRecipe);

RecipesRoutes.put('/:recipeId', recipesController.updateRecipe);

RecipesRoutes.delete('/:recipeId', recipesController.deleteRecipe);

module.exports = RecipesRoutes