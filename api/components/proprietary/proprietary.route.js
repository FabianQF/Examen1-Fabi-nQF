var express = require('express');
var router = express.Router();
var proprietaryController = require('./proprietary.controller.js');

router.param('id', function(req, res, next, id){
  req.body.id = id;
  next();
});

router.route('/save_proprietary')
.post(function(req,res){
  proprietaryController.save(req,res);
});

router.route('/get_all_proprietary')
.get(function(req,res){
  proprietaryController.findAll(req,res);
});

router.route('/update_proprietary')
.put(function(req, res){
  proprietaryController.update(req,res);
});

module.exports = router;
