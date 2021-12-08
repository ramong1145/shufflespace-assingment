const { db_user, db_password } = require('../../config');
const MongoClient = require('mongodb').MongoClient;

const DbConnection = function () {
    var databaseConnection = null;
    var instance = 0;

    async function DbConnect() {
        try {
            let connection_uri = `mongodb+srv://${db_user}:${db_password}@graphql-cluster-test.802oy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
            let _databaseConnection = await MongoClient.connect(connection_uri);
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
                console.log(`getting new db connection`);
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