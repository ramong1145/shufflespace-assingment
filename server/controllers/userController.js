const User = require('../models/user');
const { db_user, db_password } = require('../../config');
const { MongoClient } = require('mongodb');

const connection_uri = `mongodb+srv://${db_user}:${db_password}@graphql-cluster-test.802oy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(connection_uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});


client.connect(err => {
    const collection = client.db("shufflespace").collection("users");
    client.close();
});

exports.user_list = function(req, res) 
{
    res.send('USERS LIST')
}

exports.login = function(req, res)
{
    




    console.log(`passed @ ${new Date().getTime()}`)
    res.send({
        token: 'test123'
    });
}

exports.createUser = function(req, res)
{
    console.log('creating user...')
    res.send('OK');
}
/*
TODO: get an user based on the username and password
TODO: create a new user
TODO: update an user password
*/