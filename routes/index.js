let express = require('express')
let router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'wqweqweqeqweasdzxcxcvdfsggasdsad', asd:'render.json' });
});
router.get('/ssss', function(req, res, next) {
  res.send('asd.json');
});
module.exports = router;
