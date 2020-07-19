var express = require('express')
var router = express.Router()
var Resolver = require('../core/Resolver')

router.get('/', Resolver.controller('HomeController@index'));
router.get('/json', Resolver.controller('HomeController@json'));

module.exports = router;
