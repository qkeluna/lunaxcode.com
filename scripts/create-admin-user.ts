import { getLocalDB } from '../src/lib/db';
import bcrypt from 'bcryptjs';

async function createAdminUser() {
  console.log('Creating admin user...');
  
  try {
    const db = getLocalDB();
    
    const adminEmail = 'admin@lunaxcode.com';
    const adminPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    // Create admin user
    const userId = `admin_${Date.now()}`;
    
    await db.run(`
      INSERT INTO user (id, name, email, email_verified, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      userId,
      'Admin User',
      adminEmail,
      1,
      Date.now(),
      Date.now()
    ]);
    
    // Create password account
    await db.run(`
      INSERT INTO account (id, account_id, provider_id, user_id, password, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      `account_${Date.now()}`,
      adminEmail,
      'email',
      userId,
      hashedPassword,
      Date.now(),
      Date.now()
    ]);
    
    console.log('✅ Admin user created successfully!');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log('You can now sign in at http://localhost:3001/admin');
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

createAdminUser();
