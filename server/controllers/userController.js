const DbConnection = require('../database/connection').Get();
const generateUUID = require('../../utils/StringUtils');

exports.login = function(req, res)
{
    console.log(`passed @ ${new Date().getTime()}`)
    res.send({
        token: 'test123'
    });
}

exports.createUser = async function(req, res)
{
    console.log(DbConnection)
    const { email, password } = req.body;
    res.send("Ok")
    
}
/*
TODO: get an user based on the username and password
TODO: create a new user
TODO: update an user password
*/