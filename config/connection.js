// Configure mongoose connection
const { connect, connection } = require('mongoose');

// Use local db if not pushed to site
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nospaceDB';

connect(connectionString);

module.exports = connection;
