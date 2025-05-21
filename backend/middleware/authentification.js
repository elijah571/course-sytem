import jwt from 'jsonwebtoken';
import { User } from '../model/users/user.js';

// Middleware to check if the user is authenticated
export const isAuthenticateUser = async (req, res, next) => {
    let token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: "Authorization token is missing" });
    }

    try {
        // Verify the token using jwt.verify
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        // Retrieve the user from the database using the userId from the decoded token
        const user = await User.findById(decoded.userId);

      
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach the user to the request object for downstream usage
        req.user = user;

      
        next();
    } catch (error) {
        // Handle invalid or expired token errors
        console.error('JWT Error:', error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
