const express = require("express");
const ProfileController = require("../controllers/profileController");
const ProfileValidator = require("../validators/profileValidator");
const authMiddleware = require("../middlewares/authMiddleware");
const checkPermission = require("../middlewares/permissionMiddleware");
const validateRequest = require("../middlewares/validateRequest");
const { makeUploader } = require("../utils/uploadUtils");

const router = express.Router();
const userUpload = makeUploader("users");
router.use(authMiddleware);

router.get(
    "/",
    checkPermission("profile.view"),
    ProfileController.getProfile
);
router.put(
    "/",
    checkPermission("profile.update"),
    userUpload.single("profile_image"),
    ProfileValidator.updateProfileValidator,
    validateRequest,
    ProfileController.updateProfile
);
router.put(
    "/change-password",
    checkPermission("profile.update"),
    ProfileValidator.changePasswordValidator,
    validateRequest,
    ProfileController.changePassword
);

module.exports = router;