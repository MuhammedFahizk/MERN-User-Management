import * as authController from './auth.controller.js';
import * as userController from './user.controller.js';
export default {
  ...authController,
  ...userController
};
