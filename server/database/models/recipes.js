var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    id: String,
    title: String, 
    description: String,
    duration: Number,
    creator: String
});

mongoose.model('recipes', RecipeSchema)

module.exports = mongoose.model('recipes')