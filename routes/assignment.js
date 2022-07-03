const express = require('express');
const router = express.Router();
const { authenticateJWT} = require('../Middleware/authenticator');
const upload = require('../middleware/multer');
const assignmentController = require('../Controllers/assignment');


router.post('/', authenticateJWT, upload.any(), assignmentController.create);
router.get('/',assignmentController.readAll);
router.get('/:assignmentId', assignmentController.readOne);

module.exports = router;