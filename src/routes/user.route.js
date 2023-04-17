const express = require('express');
const UsersController = require('../controllers/user.controller');
const PermissionMiddleware = require('../middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../middlewares/auth.validation.middleware');
const config = require('../config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const NORMAL = config.permissionLevels.NORMAL;
const VIEWER = config.permissionLevels.VIEWER;

const router = express.Router();

router
    .route('/')
    .post(UsersController.insert)
    .get(
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(NORMAL),
        UsersController.list
    );

router
    .route('/:userId')
    .get(
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(VIEWER),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.getById)
    .patch(
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(VIEWER),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.patchById)
    .delete(
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UsersController.removeById);

module.exports = router;
