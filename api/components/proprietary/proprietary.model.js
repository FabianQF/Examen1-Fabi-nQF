//Requerimos mongoose
var mongoose = require('mongoose');

//Esquema de usuarios
var ProprietarySchema = new mongoose.Schema({
  identi: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  posistion: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  group: {
    type: String,
    required: true
  },
  ownedby: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  averageProbability: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Proprietary', ProprietarySchema);
