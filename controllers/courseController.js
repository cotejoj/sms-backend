const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    const { name, code, description } = req.body;
    const courseExists = await Course.findOne({ code });
    if (courseExists) return res.status(400).json({ msg: 'Course code already exists' });

    const course = new Course({ name, code, description });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating course', error: err.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching courses' });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ msg: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching course' });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ msg: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating course' });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ msg: 'Course not found' });
    res.json({ msg: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting course' });
  }
};
