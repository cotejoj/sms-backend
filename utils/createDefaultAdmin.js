const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function createDefaultAdmin() {
  const adminExists = await User.findOne({ email: 'admin@example.com' });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Super Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('✅ Default admin created');
  }
}

module.exports = createDefaultAdmin