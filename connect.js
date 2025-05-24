// Connecting to the database:-
const mongoose = require('mongoose');

async function connectToMongoDB(url) {
  return mongoose.connect(url);
}

module.exports = {
  connectToMongoDB,
}