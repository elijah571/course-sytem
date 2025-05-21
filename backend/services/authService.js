import bcrypt from 'bcryptjs';
import { User } from '../model/users/user.js';
import validator from 'validator';
import { sendVerificationEmail, sendResetEmail } from '../utils/sendMail.js';
import { generateToken } from '../utils/token.js';

export const signUp = async (email, name, password) => {
    if (!email || !name || !password) {
        throw new Error('All fields are required');
    }

    if (!validator.isEmail(email)) {
        throw new Error('Invalid email format');
    }

    if (!validator.isStrongPassword(password, { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
        throw new Error('Password must be strong');
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
        throw new Error('Email already exists');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationExpires = Date.now() + 1 * 60 * 60 * 1000;

    const user = new User({
        name,
        email,
        password: hashPassword,
        verificationToken,
        verificationTokenExpiresAt: verificationExpires
    });

    await user.save();
    await sendVerificationEmail(email, verificationToken);

    return user;
};

export const verifyAccount = async (verificationToken) => {
    const user = await User.findOne({ verificationToken });

    if (!user) {
        throw new Error('Invalid or expired verification token');
    }

    if (user.verificationTokenExpiresAt < Date.now()) {
        throw new Error('Verification token has expired. Request a new one.');
    }

    user.isVerified = true;
    user.verificationToken = ''; 
    user.verificationTokenExpiresAt = null; 
    await user.save();

    return user;
};

// services/authService.js
export const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Email not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const token = generateToken(user._id);
    return { user, token };
};


export const resetPasswordToken = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User does not exist');
    }

    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
       const resetLink = `https://rbac-tdba.onrender.com/reset-password/${resetToken}`;
    await user.save();
    await sendResetEmail(email, resetLink);

    return user;
};
//reset password
export const resetPassword = async (resetToken, newPassword) => {
    const user = await User.findOne({ resetPasswordToken: resetToken });

    if (!user) {
        throw new Error('Invalid or expired reset token');
    }

    if (user.resetPasswordExpiresAt < Date.now()) {
        throw new Error('Reset token has expired');
    }

    if (!validator.isStrongPassword(newPassword, { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
        throw new Error('New password is not strong enough');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = ''; 
    user.resetPasswordExpiresAt = null; 

    await user.save();
    return user;
};

