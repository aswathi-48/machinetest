

import jwt from "jsonwebtoken";
import HttpError from "./httpError.js";
import User from '../models/user.js';

const authCheck = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.error('Authorization header missing');
        return next(new HttpError('Authentication failed!', 403));
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        console.error('Token missing');
        return next(new HttpError('Authentication failed!', 403));
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const validUser = await User.findOne({ _id: decodedToken.userId, role: decodedToken.role });
        if (!validUser) {
            console.error('Invalid user');
            return next(new HttpError("Invalid credentials!", 400));
        }

        req.userDetails = { userId: decodedToken.userId, role: decodedToken.role };
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return next(new HttpError('Authentication failed!', 403));
    }
};


export default authCheck;
