const express = require('express');
const router = express.Router();
const groupController = require('../Controllers/group');
const { authenticateJWT} = require('../Middleware/authenticator')

router.post('/', authenticateJWT, groupController.create);
router.get('/', authenticateJWT, groupController.readAll);

module.exports = router;