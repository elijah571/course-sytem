import { signUp, loginUser, resetPasswordToken, resetPassword, verifyAccount } from '../services/authService.js';

// Sign Up Controller
export const signUpController = async (req, res) => {
    const { email, name, password } = req.body;
    try {
        console.log("Signup request received:", req.body);
        const user = await signUp(email, name, password);
        return res.status(201).json({
            message: 'User successfully created. Check your email for verification.',
            user
        });
    } catch (error) {
        console.error("Signup error:", error.message);

        // Corrected error handling
        const statusCode = error.message === "Password must be strong" ? 400 : 500;

        return res.status(statusCode).json({ message: error.message });
    }
};

// Account Verification Controller
export const verifyAccountController = async (req, res) => {
    const { verificationToken } = req.body;
    try {
        const user = await verifyAccount(verificationToken);
        return res.status(200).json({ message: 'Account verified successfully', user });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Login Controller
export const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log("Login request received:", req.body);
        const { user, token } = await loginUser(email, password);
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        console.error("Login error:", error.message);

    
        return res.status(401).json({ error: "Invalid credentials" }); 
    }
};

// Logout Controller

export const logoutUser = async (req, res) => {
    // Clear the token cookie
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),  // Set expiry date to a past date to clear it
    });

    return res.status(200).json({ message: "Logged out successfully" });
};

// Reset Password Token Controller
export const resetPasswordTokenController = async (req, res) => {
    const { email } = req.body;
    try {
        await resetPasswordToken(email);
        return res.status(200).json({ message: 'Reset password link sent to email.' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Reset Password Controller
export const resetPasswordController = async (req, res) => {
    const { resetToken } = req.params; 
    const { newPassword } = req.body; 

    try {
        await resetPassword(resetToken, newPassword);
        return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
