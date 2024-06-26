const express = require('express')
const { signup, signin, signout } = require('../../controllers/auth')
const { validateSigninRequest, validateSignupRequest, isRequestValidated } = require('../../validator/auth')
const { requireSignin } = require('../../middleware');
const router = express.Router()


router.post('/admin/signup',validateSignupRequest, isRequestValidated, signup)
router.post('/admin/signin',validateSigninRequest, isRequestValidated, signin)
// router.post('/admin/signout', signout)


module.exports = router;