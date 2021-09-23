const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://dtjones:5dCBQX4KNM2SChEK@cluster0.qwh31.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'chatServer',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

// sets a schema for the 'species' collection
const messageSchema = new Schema({
  message: String,
  created_by: String,
  created_at: Date,
});

// creats a model for the 'species' collection that will be part of the export

module.exports = messageSchema;
