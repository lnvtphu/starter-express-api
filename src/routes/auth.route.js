const express = require('express');
const VerifyUserMiddleware = require('../middlewares/verify.user.middleware');
const AuthorizationController = require('../controllers/auth.controller');
const AuthValidationMiddleware = require('../middlewares/auth.validation.middleware');

const router = express.Router();

router
    .route('/')
    .post(
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login)

router
    .route('/refresh')
    .post(
        AuthValidationMiddleware.validJWTNeeded,
        AuthValidationMiddleware.verifyRefreshBodyField,
        AuthValidationMiddleware.validRefreshNeeded,
        AuthorizationController.login);

module.exports = router;
