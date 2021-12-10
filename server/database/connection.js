const { db_user, db_password } = require('../../config');
var mongoose = require('mongoose');

const DbConnection = function () {
    var databaseConnection = null;
    var instance = 0;

    async function DbConnect() {
        try {
            let connection_uri = `mongodb+srv://${db_user}:${db_password}@graphql-cluster-test.802oy.mongodb.net/shufflespace?retryWrites=true&w=majority`;
            _databaseConnection = mongoose.connect(connection_uri,
            {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'shufflespace'
            }).then(
                console.log(`Connected to mongo_shufflespace: ${mongoose.connection.readyState}`)
            );
            return _databaseConnection
        } catch (e) {
            return e;
        }
    }

   function Get() {
        try {
            if (instance > 0) {
                return databaseConnection;
            } else {
                instance ++;
                databaseConnection = DbConnect();
                return databaseConnection; 
            }
        } catch (e) {
            return e;
        }
    }

    return {
        Get: Get
    }
    
}

module.exports = DbConnection();