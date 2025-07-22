const express = require('express');
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');

const auth = require('../middlewares/authMiddleware');

router.post('/', auth, createCourse); // create
router.get('/', auth, getAllCourses); // list all
router.get('/:id', auth, getCourseById); // get one
router.put('/:id', auth, updateCourse); // update
router.delete('/:id', auth, deleteCourse); // delete

module.exports = router;
