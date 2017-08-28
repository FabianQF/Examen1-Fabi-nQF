//Requerimos mongoose
var mongoose = require('mongoose');

//Esquema de usuarios
var PlayerSchema = new mongoose.Schema({
  code:{
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  alias: {
    type: String,
    required: true
  },
  money: {
    type: Number,
    required: true
  },
  photo: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Player', PlayerSchema);
