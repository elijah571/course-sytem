import { connect } from './config/connectDB.js';
import bcrypt from 'bcryptjs';
import { User } from './model/users/user.js'; 
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

connect();
const createAdmin = async () => {
    try {
        // Check if Admin already exist
        const adminExists = await User.findOne({ email: "elijahfx43@gmail.com"});
        if (adminExists) {
            console.log('Admin user already exists.');
            return;
        }

        // Admin user details
        const adminUser = new User({
            name: 'Elijah Peter',
            email: 'elijahfx43@gmail.com',
            password: await bcrypt.hash('1234567890Pe*', 10), 
            role: 'Admin', 
            isVerified: true,
        });

        await adminUser.save();
        console.log('Admin user created successfully.');
        mongoose.connection.close(); 
    } catch (error) {
        console.error('Error creating Admin user:', error);
        mongoose.connection.close();
    }
};

// Run the function to create the admin
createAdmin();
