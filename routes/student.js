const express = require('express');
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

const auth = require('../middlewares/authMiddleware');

// All routes require login
router.post('/', auth, createStudent);
router.get('/', auth, getAllStudents);
router.get('/:id', auth, getStudentById);
router.put('/:id', auth, updateStudent);
router.delete('/:id', auth, deleteStudent);

module.exports = router;
