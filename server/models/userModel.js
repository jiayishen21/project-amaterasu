const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    bgColor: {
      type: String,
      default: "#BAB4FF",
      required: [true, 'Please add a color'],
    },
    cardColor: {
      type: String,
      default: "#FF9696",
      required: [true, 'Please add a color'],
    },
    pfp: {
      type: Number,
      default: 1,
      required: [true, 'Please add a profile picture'],
    },
    sleepGoal:{
      type: Number,
      default: 0,
      required: [true, 'Please add a goal'],
    },
    calorieGoal:{
      type: Number,
      default: 0,
      required: [true, 'Please add a goal'],
    },
    waterGoal:{
      type: Number,
      default: 0,
      required: [true, 'Please add a goal'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
