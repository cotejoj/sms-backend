const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const createDefaultAdmin = require('./utils/createDefaultAdmin')
const studentRoutes = require('./routes/student');
const courseRoutes = require('./routes/course');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/courses', courseRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // create default admin
    createDefaultAdmin()
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.log(err));
