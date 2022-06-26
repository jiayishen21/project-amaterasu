const express = require('express')
const router = express.Router()
const {
  updateDaily,
  getDaily,
} = require('../controllers/dailyController')
const { protect } = require('../middleware/authMiddleware')

router.put('/', protect, updateDaily)
router.get('/', protect, getDaily)

module.exports = router