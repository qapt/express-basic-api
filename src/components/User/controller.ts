import { Request, Response, NextFunction } from 'express';
import * as UserService from './service';
import ErrorResponse from './../../errors/errorResponse';
import { createAuthCookie } from './../../utils/createCookie';
import { AUTH_TOKEN } from './../../utils/constants';

type UserLoginInput = {
    username: string;
    password: string;
};

export const getUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.signedCookies[AUTH_TOKEN];
        const user = await UserService.findUserById(userId);

        if (!user) {
            return next(new ErrorResponse(500, 'User not found'));
        }

        return res.json({
            success: true,
            user: { id: user.id, username: user.username, bio: user.bio },
        });
    } catch (error) {
        return next(new ErrorResponse(500, error.message));
    }
};

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { username, password, bio } = req.body;
    if (!username || !password) {
        return next(
            new ErrorResponse(400, 'Please provide username and password')
        );
    }

    try {
        const newUser = await UserService.createUser(username, password, bio);
        createAuthCookie(res, newUser.id);

        return res.status(201).json({
            success: true,
            user: {
                id: newUser.id,
                username: newUser.username,
                bio: newUser.bio,
            },
        });
    } catch (error) {
        return next(new ErrorResponse(500, error.message));
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return next(
            new ErrorResponse(400, 'Please provide username and password')
        );
    }

    try {
        const user = await UserService.findUserByUsername(username);
        if (!user || !(await user.matchPasswords(password))) {
            return next(new ErrorResponse(401, 'Invalid credentials'));
        }

        createAuthCookie(res, user.id);
        return res.status(200).json({
            success: true,
            user: { id: user.id, username: user.username, bio: user.bio },
        });
    } catch (error) {
        return next(new ErrorResponse(500, error.message));
    }
};

export const logout = async (req: Request, res: Response) => {
    res.clearCookie(AUTH_TOKEN);
    return res.json({ success: true, message: 'Logged out' });
};

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await UserService.getAllUsers();
    return res.json({ users });
};
