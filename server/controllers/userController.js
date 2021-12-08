const DbConnection = require('../database/connection').Get();
const generateUUID = require('../../utils/StringUtils');
const users = require('../database/models/users');

exports.login = function(req, res)
{
    const { email, password } = req.body;
    users.findOne({email: email, password: password}).exec((err, data) => {
        if(err) {
            res.send({
                StatusCode: 400,
                Message: "Something went wrong"
            });
        }
        else if(data) {
            res.send({
                StatusCode: 200,
                Message: "OK",
                token: "token123"
                //TODO: token generation and set an expire time
            });
        }
        else {
            res.send({
                StatusCode: 404,
                Message: "User not found"
            })
        }
    })
}

exports.createUser = async function(req, res) {
    const { email, password } = req.body;
    users.findOne({email: email}).exec((err, data) => {
        if(err) {
            res.send({
                StatusCode: 400,
                Message: "Something went wrong"
            })
        }
        else if(data) {
            res.send({
                StatusCode: 400,
                Message: "There's already a user registered with that email"
            })
        }
        else {
            users.create({email, password})
                .then(result => {
                    res.send({
                        StatusCode: 200,
                        Message: "Created",
                        Result: {...result._doc}
                    })
                })
                .catch(error => {
                    res.send(error)
                })
        }
    })
}

exports.updatePassword = function(req, res) {
    const { email, password, newPassword } = req.body;
    users.findOne({email: email, password: password}).exec((err, data) => {
        if(err) {
            res.send({
                StatusCode: 400,
                Message: "Something went wrong"
            });
        }
        else if(data) {
            if(password === newPassword) {
                res.send({
                    StatusCode: 400,
                    Message: "New password cannot be the same as the previous"
                })
            }
            else {
                users.updateOne(
                    { "email": email }, { $set: {"password": newPassword}}
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
        }
        else {
            res.send({
                StatusCode: 404,
                Message: "User not found"
            })
        }
    })
}

/*
TODO: decode and encode user passwords (passport or jwt)
*/