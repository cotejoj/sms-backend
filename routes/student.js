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
const allowRoles = require('../middlewares/roleMiddlware');
// All routes require login
router.post('/', auth, allowRoles('staff', 'admin'), createStudent);
router.get('/', auth, allowRoles('staff', 'admin'), getAllStudents);
router.get('/:id', auth, allowRoles('staff', 'admin'), getStudentById);
router.put('/:id', auth, allowRoles('staff', 'admin'), updateStudent);
router.delete('/:id', auth, allowRoles('staff', 'admin'), deleteStudent);

module.exports = router;
