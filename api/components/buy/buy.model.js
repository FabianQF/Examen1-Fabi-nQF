//Requerimos mongoose
var mongoose = require('mongoose');

//Esquema de usuarios
var BuySchema = new mongoose.Schema({
  player: {
    type: String,
    required: true
  },
  proprietary: {
    type: String,
    unique: true,
    required: true
  }
});

module.exports = mongoose.model('Buy', BuySchema);
