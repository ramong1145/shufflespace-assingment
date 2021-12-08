const express = require('express');
const RecipesRoutes = express.Router();
const recipesController = require('../controllers/recipeController');

RecipesRoutes.get('/', recipesController.getAllRecipes);

RecipesRoutes.get('/:userId', recipesController.getByUser);

RecipesRoutes.post('/post', recipesController.createRecipe);

RecipesRoutes.put('/:id', recipesController.updateRecipe);

RecipesRoutes.delete('/:id', recipesController.deleteRecipe);

module.exports = RecipesRoutes