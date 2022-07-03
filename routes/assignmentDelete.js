const express = require('express');
const router = express.Router();
const { authenticateJWT} = require('../Middleware/authenticator');
const assignmentController = require('../Controllers/assignment');

router.delete('/:assignmentId',authenticateJWT, assignmentController.delete);

module.exports = router;
