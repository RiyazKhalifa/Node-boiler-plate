const express = require('express');
const authMiddleware = require("../middlewares/authMiddleware");
const checkPermission = require("../middlewares/permissionMiddleware");
const validateRequest = require("../middlewares/validateRequest");
const siteSettingController = require('../controllers/siteSettingController');
const siteSettingValidator = require('../validators/siteSettingValidator');

const router = express.Router();
router.use(authMiddleware);

router.get(
    '/',
    checkPermission("site_setting.list"),
    siteSettingController.getAllSiteSettings
);
router.put(
    '/',
    checkPermission("site_setting.update"),
    siteSettingValidator.updateMultipleSiteSettingsValidator,
    validateRequest,
    siteSettingController.updateMultipleSiteSettings
);

module.exports = router;