const express = require('express');
const { userLogin, validateToken } = require('../controllers/controllerLogin');

const router = express.Router();

router.post('/', userLogin);
router.get('/token/:token', validateToken);

module.exports = router;