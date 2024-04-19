const express = require('express')
const { createPost } = require('../../controllers/posts')
const router = express.Router()


router.post('/create/post', createPost)
// router.post('/admin/signout', signout)


module.exports = router;