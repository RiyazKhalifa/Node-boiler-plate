const express = require('express');
const authMiddleware = require("../middlewares/authMiddleware");
const checkPermission = require("../middlewares/permissionMiddleware");
const validateRequest = require("../middlewares/validateRequest");
const cmsController = require('../controllers/cmsController');
const cmsValidator = require('../validators/cmsValidator');

const router = express.Router();
router.use(authMiddleware);

router.get(
    '/',
    checkPermission("cms.list"),
    cmsController.getAllCms
);
router.get(
    '/:id',
    checkPermission("cms.view"),
    cmsValidator.cmsIdValidator,
    validateRequest,
    cmsController.getCmsById
);
router.put(
    '/:id',
    checkPermission("cms.update"),
    cmsValidator.updateCmsValidator,
    validateRequest,
    cmsController.updateCms
);

module.exports = router;