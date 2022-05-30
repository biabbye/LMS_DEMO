const express = require('express');
const router = express.Router();
const {
    registerValidator,
    validatorResult,
    loginValidator
} = require('../Middleware/validator');
const {registerController, loginController } = require('../Controllers/auth');

router.post('/register', registerValidator, validatorResult, registerController);
router.post('/login', loginValidator, validatorResult, loginController);

module.exports = router;