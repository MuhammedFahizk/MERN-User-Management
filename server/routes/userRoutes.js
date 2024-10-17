import express from "express";
import userControllers from "../controllers/index.js";
import { requireAuthentication } from "../middleware/autchCheck.js";

const router = express.Router();

/**
 * @route POST /api/users/register
 * @description User Registration
 * @access Public
 * @param {Object} req - Express request object containing user data
 * @param {Object} res - Express response object for sending responses
 * @returns {Object} - Response object containing the message and user data or error details
 */
router.post("/register", userControllers.register);

/**
 * @route POST /api/users/login
 * @description User Login
 * @access Public
 * @param {Object} req - Express request object containing user credentials
 * @param {Object} res - Express response object for sending responses
 * @returns {Object} - Response object containing the message, token, or error details
 */
router.post("/login", userControllers.loginUser);

/**
 * @method - POST
 * @param {string} path - /api/users/profile
 * @description - fetch user profile data
 */
router.get("/profile", requireAuthentication, userControllers.profile);

/**
 * @method - POST
 * @param {string} path - /api/users/reauth
 * @description - Refresh Access Token
 */
router.post("/reauth", userControllers.refreshAccessToken);

/**
 * @method - POST
 * @param {string} path - /api/users/logout
 * @description - User Logout
 */
router.post("/logout", requireAuthentication, userControllers.logout);


/**
 * @method - PATCH
 * @param {string} path - /api/users/profile
 * @description - Update User Profile
 */
router.patch("/profile", requireAuthentication, userControllers.updateProfile);



/**
 * @method - POST
 * @param {string} path - /api/users/master-logout
 * @description - User Logout from all devices
 */
router.post(
  "/master-logout",
  requireAuthentication,
  userControllers.logoutAllDevices
);
export default router;
