const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  enrollmentNumber: { type: String, required: true, unique: true },
  age: Number,
  birthdate: Date,
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  addressLine1: String,
  addressLine12: String,
  state: String,
  city: String,
  postalCode: String,
  country: String,
  phone: String,
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  grades: {
    type: Map,
    of: String // Example: { "Math": "A", "Science": "B" }
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
