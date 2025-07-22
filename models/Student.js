const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  enrollmentNumber: { type: String, required: true, unique: true },
  age: Number,
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  courses: [String],
  grades: {
    type: Map,
    of: String // Example: { "Math": "A", "Science": "B" }
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
