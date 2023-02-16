const { MongoClient } = require("mongodb");

const connectionString = 'mongodb://localhost:27017'

let dbConnection;

module.exports = {
  async connectToServer() {
    try {
      const client = await MongoClient.connect(connectionString)

      console.log("Successfully connected to MongoDB.");

      return client;
    } catch (err) {
      throw new Error(err)
    }
  },

  getDb: function () {
    return dbConnection;
  },
};