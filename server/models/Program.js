const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    day: String,
    time: String,
    spots: Number,
    type: String,
    focus: String,
    isAvailable: { type: Boolean, default: true }
}, { _id: false });

const programSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  duration: { type: String, required: true },
  level: { type: String, required: true },
  maxParticipants: { type: String, required: true },
  price: { type: Number, required: true },
  instructor: { name: { type: String, required: true } },
  schedule: [scheduleSchema],
  category: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.models.Program || mongoose.model('Program', programSchema);