const mongoose  = require ('mongoose');

const Users = mongoose.model('users');
const Posts = mongoose.model('posts');
const Tips = mongoose.model('tips');

// handle image uploading
const multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({storage : storage}).single('image');

function uploadimg(req, res) {
    upload(req, res, function (err) {
        if (err) return res.sendStatus(404);
        if(req.file) {
            res.json(req.file);
        }
    })
}

// redirect the root to homepage of the site
function main(req, res) { res.sendFile(path.join(__dirname + '/../public/main.html')) }

// handle searching request
function searching(req, res) {
    if (req.query.type === 'user') {
        Users.find({name: { $regex : req.query.key, $options : 'i' }}, function(err, result){
            return err ? res.sendStatus(404) : res.send(result);
        });

    } else if (req.query.type === 'post') {
        Posts.find({[req.query.method]: { '$regex' : req.query.key, '$options' : 'i' }}, function(err,result){
            return err ? res.sendStatus(404) : res.send(result);
        });
    }
}

//library renderer
function library(req,res){
    var elecArray = [];
    var plasArray = [];
    var furnArray = [];
    var glasArray = [];
    var otheArray = [];
    Tips.find(function(err, tips){
      if (err) {
          return res.sendStatus(404);
      }
      tips.forEach(function (element) {
          if (element.type === "electric") {
              elecArray.push(element);
          }
          if (element.type === "plastic") {
              plasArray.push(element);
          }
          if (element.type === "furniture") {
              furnArray.push(element);
          }
          if (element.type === "other") {
              otheArray.push(element);
          }
          if (element.type === "glass") {
              glasArray.push(element);
          }
      });

      return res.render('library', {
          elecArray:elecArray,
          plasArray:plasArray,
          furnArray:furnArray,
          glasArray:glasArray,
          otheArray:otheArray

      });
    });
}

// handle get request for tips
function tipspage(req,res){
    Tips.findOne({id:req.query.tipsid},function(err,tips){
        if (err) return res.sendStatus(404);
        return res.render('tippages', {
            tips: tips,
        });
    });
}

module.exports.searching = searching;
module.exports.library = library;
module.exports.tipspage = tipspage;
module.exports.uploadimg = uploadimg;
module.exports.main = main;


