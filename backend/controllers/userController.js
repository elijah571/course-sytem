import { getAllUsers, getUserById, updateProfile, deleteUserById } from '../services/userService.js';

export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUserByIdController = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await getUserById(userId);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

export const updateProfileController = async (req, res) => {
    const { userId } = req.params;
    const { name, email, role } = req.body;
    try {
        const updatedUser = await updateProfile(userId, { name, email, role });
        return res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const deleteUserByIdController = async (req, res) => {
    const { userId } = req.params;
    try {
        await deleteUserById(userId);
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};
