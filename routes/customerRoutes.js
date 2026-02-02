const express = require("express");
const CustomerController = require("../controllers/customerController");
const CustomerValidator = require("../validators/customerValidator");
const authMiddleware = require("../middlewares/authMiddleware");
const checkPermission = require("../middlewares/permissionMiddleware");
const validateRequest = require("../middlewares/validateRequest");

const router = express.Router();
router.use(authMiddleware);

router.get(
    "/",
    checkPermission("customer.list"),
    CustomerController.getAllCustomers
);
router.get(
    "/:id",
    checkPermission("customer.view"),
    CustomerValidator.customerIdValidator,
    validateRequest,
    CustomerController.getCustomerById
);

module.exports = router;