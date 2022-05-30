const express = require('express');
const router = express.Router();
const { authenticateJWT} = require('../Middleware/authenticator')
const assignmentController = require('../Controllers/assignment');


router.post('/', authenticateJWT, assignmentController.create);
router.get('/',assignmentController.readAll);

module.exports = router;