const express = require("express");
const CommonController = require("../controllers/commonController");
const CommonValidator = require("../validators/commonValidator");
const authMiddleware = require("../middlewares/authMiddleware");
const checkPermission = require("../middlewares/permissionMiddleware");
const validateRequest = require("../middlewares/validateRequest");

const router = express.Router();
router.use(authMiddleware);

router.put(
    "/status",
    checkPermission("status.update"),
    CommonValidator.updateStatusValidator,
    validateRequest,
    CommonController.updateStatus
);
router.delete(
    "/delete",
    checkPermission("record.delete"),
    CommonValidator.deleteValidator,
    validateRequest,
    CommonController.delete
);
router.put(
    "/sequence",
    checkPermission("sequence.update"),
    CommonValidator.adjustSequenceValidator,
    validateRequest,
    CommonController.adjustSequence
);

module.exports = router;