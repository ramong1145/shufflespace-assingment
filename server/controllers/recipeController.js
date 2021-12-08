const resourceUtil = require('../../utils/ResourcesUtil');
const recipes = require('../database/models/recipes');

exports.getAllRecipes = function(req, res) {
    res.send({
        image: resourceUtil.getRandomFoodImage()
    })
}

exports.getByUser = function(req, res) {
    const { userId } = req.route.query.userId
    recipes.find({creator: userId}, (err, data) => {
        if(err) {
            res.send({
                StatusCode: 400,
                Message: "Something went wrong"
            });
        }
        else if(data) {
            res.send({
                StatusCode: 200, 
                Message: 'Ok',
                Result: {...data}
            })
        }
    })
}

exports.createRecipe = function(req, res) {
    const { title, description, duration } = req.body;
    const { recipeId } = req.route.query.recipeId;

    recipes.findOne({id: recipeId}).exec((err, data) => {
        if(err) {
            res.send({
                StatusCode: 400,
                Message: "Something went wrong"
            });
        }
        else if(!data) {
            res.send({
                StatusCode: 404,
                Message: "Something happened looking for a recipe"
            })
        }
        else {
            recipes.updateOne(
                { "id": recipeId }, { $set: {"title": title, "description": description, "duration": duration }}
            ).then(result => {
                if(result.matchedCount > 0) {
                    res.send({
                        StatusCode: 200,
                        Message: "Success",
                        Result: {...result}
                    })
                }
            })
        }
    })
}

exports.updateRecipe = function(req, res) {
    const { title, description, duration } = req.body
    const { userId } = req.route.query.userId
    recipes.find({creator: userId}, (err, data) => {
        if(err) {
            res.send({
                StatusCode: 400,
                Message: "Something went wrong"
            });
        }
        else if(data) {
            res.send({
                StatusCode: 200, 
                Message: 'Ok',
                Result: {...data}
            })
        }
    })
}


exports.deleteRecipe = function(req, res) {
    const { recipeId } = req.route.query.recipeId
    recipes.deleteOne({id: recipeId}, (err) => {
        if(err) {
            res.send({
                StatusCode: 400,
                Message: "Something went wrong"
            });
        }
        else {
            res.send({
                StatusCode: 200,
                Message: "Deleted Succesfully"
            })
        }
    })
}