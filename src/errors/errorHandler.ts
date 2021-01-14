import { NextFunction, Request, Response } from 'express';
import ErrorResponse from './errorResponse';

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ErrorResponse) {
        return res
            .status(err.statusCode)
            .json({ success: false, error: { message: err.message } });
    }

    return res.status(500).json('Something went wrong');
};
