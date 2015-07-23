var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var articles = db.get('articles');
var functions = require('../public/javascripts/serverside.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  articles.find({ $query: {}, $orderby: { _id : -1 } }, function(err, data){
    res.render('index', { articles: data });
  })
});

router.get('/articles/new', function(req, res, next) {
  res.render('new', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  data = {
    title: req.body.title,
    bkg: req.body.bkg,
    dark: req.body.dark,
    excerpt: req.body.excerpt,
    text: req.body.text
  };
  if (data.excerpt.length > 400){
    data.excerpt = data.excerpt.substring(0,400);
    data.excerpt += '...';
  };
  var validation = functions.validate(data);
  if(validation.count === 0){
    if(validation.bkg){
      data.bkg = validation.bkg;
      data.dark = null;
    }
    articles.insert(data)
    res.redirect('/');
  } else {
    res.render('new', { articles: data, errors: validation });
  }
});

router.get('/articles/:id/edit', function(req, res, next) {
  articles.findOne({ _id: req.params.id }, function(err, data){
    if(data.bkg == 'images/default.jpg'){
      data.bkg = null;
      data.dark = null;
    }
    res.render('edit', { articles: data });
  })
});

router.post('/articles/:id', function(req, res, next) {
  data = {
    title: req.body.title,
    bkg: req.body.bkg,
    dark: req.body.dark,
    excerpt: req.body.excerpt,
    text: req.body.text
  };
  if (data.excerpt.length > 400){
    data.excerpt = data.excerpt.substring(0,400);
    data.excerpt += '...';
  };
  var validation = functions.validate(data);
  if(validation.count === 0){
    if(validation.bkg){
      data.bkg = validation.bkg;
      data.dark = null;
    }
    articles.update({_id: req.params.id}, data)
    res.redirect('/');
  } else {
    res.render('edit', { articles: data, errors: validation });
  }
});

router.get('/articles/:id/delete', function(req, res, next) {
  articles.remove({ _id: req.params.id }, function(err, data){
    res.redirect('/');
  })
});


module.exports = router;
