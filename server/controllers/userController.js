const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const SALT_ROUNDS = process.env.SALT_ROUNDS

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  const salt = await bcrypt.genSalt(SALT_ROUNDS)
  const hashedPassword = await bcrypt.hash(password, salt)
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      bgColor: user.bgColor,
      cardColor: user.cardColor,
      pfp: user.pfp,
      day: 0,
      sleepGoal: user.sleepGoal,
      calorieGoal: user.calorieGoal,
      waterGoal: user.waterGoal,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Update ser
// @route   PUT /api/users
// @access  Public
const updateUser = asyncHandler(async (req, res) => {
  const { pfp, bgColor, cardColor, name, oldEmail, email, password, sleepGoal, calorieGoal, waterGoal } = req.body
  const id = (await User.findOne({oldEmail}))._id
  const user = await User.findByIdAndUpdate(id, {
    pfp,
    bgColor,
    cardColor,
    name,
    //email,
    //password: hashedPassword,
    sleepGoal,
    calorieGoal,
    waterGoal,
    }, {
    new: true,
  })
  if (user) {
    const day = parseInt((new Date() - user.createdAt)/86400000);
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      bgColor: user.bgColor,
      cardColor: user.cardColor,
      pfp: user.pfp,
      day: day,
      sleepGoal: user.sleepGoal,
      calorieGoal: user.calorieGoal,
      waterGoal: user.waterGoal,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    const day = parseInt((new Date() - user.createdAt)/86400000);
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      bgColor: user.bgColor,
      cardColor: user.cardColor,
      pfp: user.pfp,
      day: day,
      sleepGoal: user.sleepGoal,
      calorieGoal: user.calorieGoal,
      waterGoal: user.waterGoal,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  updateUser,
  loginUser,
  getMe,
}
