const express = require('express');
const StudentsController = require('../controllers/student.controller');
const PermissionMiddleware = require('../middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../middlewares/auth.validation.middleware');
const config = require('../config/env.config');
const StudentsValidation = require('../validations/students.validation');

const ADMIN = config.permissionLevels.ADMIN;
const NORMAL = config.permissionLevels.NORMAL;
const VIEWER = config.permissionLevels.VIEWER;

const router = express.Router();

router
    .route('/')
    .post(
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(NORMAL),
        ValidationMiddleware.validFields(StudentsValidation.createStudent),
        StudentsController.createStudent)
    .get(
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(NORMAL),
        StudentsController.getStudents);

router
    .route('/:studentId')
    .get(
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(NORMAL),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        StudentsController.getStudent)
    .patch(
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(NORMAL),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        StudentsController.updateStudent)
    .delete(
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(NORMAL),
        StudentsController.deleteStudent);

module.exports = router;
