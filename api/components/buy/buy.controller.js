var Buy = require('./buy.model.js');

module.exports.save = function(req, res){
  var newBuy = new Buy({
    player: req.body.player,
    proprietary: req.body.proprietary
  });

newBuy.save(function(err){
    if(err){
      res.json({success:false, msg:'No se pudo realizar la compra' + err});
    }else{
      res.json({success:true, msg:'Se registró la compra correctamente'});
    }
  });
}

module.exports.findAll = function(req,res){
  Buy.find().then(function(buys){
    res.send(buys);
  })
};
