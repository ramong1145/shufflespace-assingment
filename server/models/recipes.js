var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var IngredientSchema = new Schema({
    name: String, 
    amount: Number
});

var RecipeSchema = new Schema({
    id: String,
    name: String, 
    ingredients: [{type: IngredientSchema, default: 1}],
    creator: String
});

mongoose.model('recipe', RecipeSchema)