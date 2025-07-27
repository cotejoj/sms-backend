const Student = require('../models/Student');

exports.createStudent = async (req, res) => {
  try {
    const { firstName, middleName,lastName , status, email, birthDate,birthPlace,addressLine1,addressLine2,state,country,postalCode,phone, age, gender, course,grades } = req.body;

    // Get current year
    const year = new Date().getFullYear();

    // Count students created this year
    const count = await Student.countDocuments({
      enrollmentNumber: { $regex: `^ENR${year}-` }
    });

    const paddedCount = String(count + 1).padStart(3, '0');
    const enrollmentNumber = `ENR${year}-${paddedCount}`;

    const student = new Student({
      firstName,
      middleName,
      lastName,
      status,
      email,
      enrollmentNumber,
      birthDate,
      birthPlace,
      addressLine1,
      addressLine2,
      state,
      country,
      postalCode,
      phone,
      age,
      gender,
      course,
      grades
    });

    await student.save();

    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ msg: 'Error creating student', error: err.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const {
      search = '',
      page = 1,
      limit = 10,
      course,
      gender
    } = req.query;

    const query = {
      $and: [
        {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
          ]
        }
      ]
    };

    // Filter by course
    if (course) {
      query.$and.push({ course: course });
    }

    // Filter by gender
    if (gender) {
      query.$and.push({ gender: gender });
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const students = await Student.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('course');

    const total = await Student.countDocuments(query);

    res.json({
      students,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit)
    });

  } catch (err) {
    res.status(500).json({ msg: 'Error fetching students', error: err.message });
  }
};



exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('course');
    if (!student) return res.status(404).json({ msg: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching student' });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ msg: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ msg: 'Error updating student', error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ msg: 'Student not found' });
    res.json({ msg: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting student' });
  }
};
