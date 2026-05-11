const User = require('../models/User');

const seedAdminUser = async () => {
  try {
    const email = process.env.ADMIN_EMAIL || 'admin@example.com';
    const password = process.env.ADMIN_PASSWORD || 'Admin1234';
    const existingAdmin = await User.findOne({ email });
    if (!existingAdmin) {
      await User.create({
        name: 'Admin User',
        email,
        password,
        role: 'admin',
      });
      console.log('Default admin user created:', email);
    }
  } catch (error) {
    console.error('Admin seed failed:', error.message);
  }
};

module.exports = { seedAdminUser };
