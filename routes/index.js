var express = require('express');
var router = express.Router();
var auth = require('../controllers/auth');
var c = require('../controllers')
var mid = require('../helpers/middleware');

router.post('/auth/register', auth.register);
router.post('/auth/login', auth.login);
router.post('/auth/whoami', mid.mustLogin, auth.whoami);

router.post('/user_game_biodata/create', mid.mustLogin, c.ubi.createB);
router.put('/user_game_biodata/update', mid.mustLogin, c.ubi.updateB);
router.delete('/user_game_biodata/delete', mid.mustLogin, c.ubi.delete);

router.post('/user_game_history/create', mid.mustLogin, c.uhi.createUH);
router.put('/user_game_history/update', mid.mustLogin, c.uhi.updateH);
router.delete('/user_game_history/delete', mid.mustLogin, c.uhi.delete);

module.exports = router;