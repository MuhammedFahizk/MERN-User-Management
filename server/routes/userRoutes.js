import express from 'express';
import userControllers  from '../controllers/index.js'

const router = express.Router();

/**
 * @route POST /api/users/register
 * @description User Registration
 * @access Public
 * @param {Object} req - Express request object containing user data
 * @param {Object} res - Express response object for sending responses
 * @returns {Object} - Response object containing the message and user data or error details
 */
router.post('/register', userControllers.register);

/**
 * @route POST /api/users/login
 * @description User Login
 * @access Public
 * @param {Object} req - Express request object containing user credentials
 * @param {Object} res - Express response object for sending responses
 * @returns {Object} - Response object containing the message, token, or error details
 */
router.post('/login', userControllers.loginUser);

export default router;
