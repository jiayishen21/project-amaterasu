const express = require('express')
const router = express.Router()
const {
  registerUser,
  updateUser,
  loginUser,
  getMe,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.put('/', updateUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router
