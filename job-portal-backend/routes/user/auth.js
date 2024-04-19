const express = require('express')
const { signup, signin } = require('../controller/auth');
const { requireSignin, adminMiddleware } = require('../middleware');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validator/auth');
const router = express.Router()

router.post(
  "/add_employee",
  validateSignupRequest,
  requireSignin,
  adminMiddleware,
  isRequestValidated,
  signup
);
router.post('/signin',validateSigninRequest, isRequestValidated, signin)

module.exports = router;