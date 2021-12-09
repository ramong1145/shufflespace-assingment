const DbConnection = require('../database/connection').Get();
const resourceUtil = require('../../src/utils/ResourcesUtil');
const recipes = require('../database/models/recipes');
const short = require('short-uuid');

exports.getByUser = function(req, res) {
    const { userId } = req.params
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
                Result: data
            })
        }
    })
}

exports.createRecipe = function(req, res) {
    const { title, description, duration, creator } = req.body;
    recipes.create({id: short.generate() ,title, description, duration, creator})
        .then(result => {
            res.send({
                StatusCode: 200,
                Message: "Created",
                Result: {...result._doc}
            })
        })
}

exports.updateRecipe = function(req, res) {
    const { title, description, duration } = req.body;
    const { recipeId } = req.params;

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

exports.deleteRecipe = function(req, res) {
    const { recipeId } = req.params
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