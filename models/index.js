const mongoose = require('mongoose');
const DB_URI = process.envMONGOD_URI || 'mongod://localhost:27017/project1'

mongoose.connect(DB_URI, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected successfully..."))
  .catch((err) => console.log(err));

  module.exports = {
  	Restaurant: require('./Restaurant'),
  	Review: require('./Review')	
  }