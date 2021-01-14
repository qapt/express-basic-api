import { NextFunction, Request, Response } from 'express';
import { AUTH_TOKEN } from './../utils/constants';
import ErrorResponse from '../errors/errorResponse';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.signedCookies[AUTH_TOKEN]) {
        return next(new ErrorResponse(401, 'Please authenticate'));
    }

    return next();
};
