'use server';

import { redirect } from 'next/navigation';
import User from '@/models/User';
import connectDB from '@/config/db';
import bcrypt from 'bcryptjs';

export async function registerUser(formData) {
  const { name, email, password } = Object.fromEntries(formData);
  
  try {
    await connectDB();
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error('User already exists');
    }
    
    const user = new User({
      name,
      email,
      password,
    });
    
    await user.save();
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}