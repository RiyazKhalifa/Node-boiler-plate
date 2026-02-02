const express = require('express');
const authMiddleware = require("../middlewares/authMiddleware");
const checkPermission = require("../middlewares/permissionMiddleware");
const validateRequest = require("../middlewares/validateRequest");
const faqController = require('../controllers/faqController');
const faqValidator = require('../validators/faqValidator');

const router = express.Router();
router.use(authMiddleware);

router.get(
    '/',
    checkPermission("faq.list"),
    faqController.getAllFaqs
);
router.get(
    '/:id',
    checkPermission("faq.view"),
    faqValidator.faqIdValidator,
    validateRequest,
    faqController.getFaqById
);
router.post(
    '/',
    checkPermission("faq.create"),
    faqValidator.createFaqValidator,
    validateRequest,
    faqController.createFaq
);
router.put(
    '/:id',
    checkPermission("faq.update"),
    faqValidator.updateFaqValidator,
    validateRequest,
    faqController.updateFaq
);

module.exports = router;