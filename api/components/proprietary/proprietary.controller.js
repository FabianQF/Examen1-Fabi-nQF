var Proprietary = require('./proprietary.model.js');

module.exports.save = function(req, res){
  var newProprietary = new Proprietary({
    identi: req.body.identi,
    name: req.body.name,
    posistion: req.body.posistion,
    price: req.body.price,
    group: req.body.group,
    ownedby: req.body.ownedby,
    photo: req.body.photo,
    averageProbability: req.body.averageProbability
  });

  newProprietary.save(function(err){
    if(err){
      res.json({success:false, msg:'No se pudo registar la propiedad' + err});
    }else{
      res.json({success:true, msg:'Se registró correctamente'});
    }
  });
}

module.exports.findAll = function(req,res){
  Proprietary.find().then(function(proprietary){
    res.send(proprietary);
  })
};

module.exports.update = function(req,res){
  Proprietary.findByIdAndUpdate(req.body._id, { $set: req.body}, function (err, proprietary) {
    if (err){
      res.json({success:true,msg:'No se ha actualizado.' + handleError(err)});
    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }
  });

}
