import { NextFunction, Request, Response } from 'express';
import * as PostService from './service';
import ErrorResponse from './../../errors/errorResponse';
import { AUTH_TOKEN } from './../../utils/constants';

export const getAllPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const posts = await PostService.getAllPosts();

        if (!posts) {
            return next(new ErrorResponse(404, 'Unable to fetch posts'));
        }

        return res.json({
            success: true,
            posts,
        });
    } catch (error) {
        return next(new ErrorResponse(500, error.message));
    }
};

export const getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    try {
        const post = await PostService.findPostById(parseInt(id));
        if (!post) {
            return next(new ErrorResponse(404, 'Unable to fetch post'));
        }
        res.status(200).json({
            success: true,
            post,
        });
    } catch (error) {
        return next(new ErrorResponse(500, error.message));
    }
};

export const createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { title, content } = req.body;
    const userId = req.signedCookies[AUTH_TOKEN];

    if (!title || !content) {
        return next(
            new ErrorResponse(500, 'Title and content must be provided')
        );
    }

    try {
        const createdPost = await PostService.createPost(
            userId,
            title,
            content
        );
        res.status(201).json({
            success: true,
            post: createdPost,
        });
    } catch (error) {
        return next(new ErrorResponse(500, error.message));
    }
};

export const updatePost = (req: Request, res: Response) => {};

export const deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    try {
        const deletedPost = await PostService.deletePost(parseInt(id));

        res.status(200).json({
            success: true,
            post: deletedPost,
        });
    } catch (error) {
        return next(new ErrorResponse(500, error.message));
    }
};
