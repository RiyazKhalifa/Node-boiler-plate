const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
const userRoutes = require("./userRoutes");
const roleRoutes = require("./roleRoutes");
const permissionRoutes = require("./permissionRoutes");
const customerRoutes = require("./customerRoutes");
const cmsRoutes = require("./cmsRoutes");
const siteSettingRoutes = require("./siteSettingRoutes");
const faqRoutes = require("./faqRoutes");
const commonRoutes = require("./commonRoutes");

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", permissionRoutes);
router.use("/customers", customerRoutes);
router.use("/cms", cmsRoutes);
router.use("/site-settings", siteSettingRoutes);
router.use("/faqs", faqRoutes);
router.use("/common", commonRoutes);

module.exports = router;