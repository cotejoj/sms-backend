const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  enrollmentNumber: { type: String, required: true, unique: true },
  age: Number,
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  grades: {
    type: Map,
    of: String // Example: { "Math": "A", "Science": "B" }
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
