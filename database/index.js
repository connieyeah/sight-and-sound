var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/music', {useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('successfully connected to mongoose');
});

var musicSchema = mongoose.Schema({
  

});

var Music = mongoose.model('Music', musicSchema);

