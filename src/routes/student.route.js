const StudentsController = require('../controllers/student.controller');
const PermissionMiddleware = require('../middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../middlewares/auth.validation.middleware');
const config = require('../config/env.config');
const StudentsValidation = require('../validations/students.validation');

const ADMIN = config.permissionLevels.ADMIN;
const NORMAL = config.permissionLevels.NORMAL;
const VIEWER = config.permissionLevels.VIEWER;

exports.routesConfig = function (app) {
    app.post('/students', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(NORMAL),
        ValidationMiddleware.validFields(StudentsValidation.createStudent),
        StudentsController.insert
    ]);
    app.get('/students', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(NORMAL),
        StudentsController.list
    ]);
    app.get('/students/:studentId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(VIEWER),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        StudentsController.getById
    ]);
    app.patch('/students/:studentId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(VIEWER),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        StudentsController.patchById
    ]);
    app.delete('/students/:studentId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        StudentsController.removeById
    ]);
};
