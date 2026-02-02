const express = require('express');
const authMiddleware = require("../middlewares/authMiddleware");
const checkPermission = require("../middlewares/permissionMiddleware");
const validateRequest = require("../middlewares/validateRequest");
const rolePermissionController = require('../controllers/rolePermissionController');
const rolePermissionValidator = require('../validators/rolePermissionValidator');

const router = express.Router();
router.use(authMiddleware);

router.post(
    '/',
    rolePermissionValidator.createPermissionValidator,
    validateRequest,
    rolePermissionController.createPermission
);
router.get(
    '/',
    rolePermissionController.getAllPermissions
);
router.get(
    '/:id',
    rolePermissionValidator.permissionIdValidator,
    validateRequest,
    rolePermissionController.getPermissionById
);
router.put(
    '/:id',
    rolePermissionValidator.updatePermissionValidator,
    validateRequest,
    rolePermissionController.updatePermission
);


module.exports = router;