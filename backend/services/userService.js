import { User } from '../model/users/user.js';

export const getAllUsers = async () => {
    return await User.find({}).select("-password");
};

export const getUserById = async (userId) => {
    const user = await User.findById(userId).select("-password");
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

export const updateProfile = async (userId, { name, email, role }) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    await user.save();
    return user;
};

export const deleteUserById = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    await user.deleteOne();
    return user;
};
