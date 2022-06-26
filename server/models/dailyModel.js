const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
		sleep: {
			type: Number,
			default: 0,
      required: [true, 'Please add a value'],
		},
		calorie: {
			type: Number,
			default: 0,
      required: [true, 'Please add a value'],
		},
		water: {
			type: Number,
			default: 0,
      required: [true, 'Please add a value'],
		}
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Daily', goalSchema)
