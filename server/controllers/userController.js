const DbConnection = require('../database/connection').Get();
const generateUUID = require('../../utils/StringUtils');
const users = require('../database/models/users');

exports.login = function(req, res)
{
    console.log(`passed @ ${new Date().getTime()}`)
    res.send({
        token: 'test123'
    });
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
/*
TODO: get an user based on the username and password
TODO: create a new user
TODO: update an user password
*/