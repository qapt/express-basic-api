import { Post } from './model';

export const getAllPosts = async () => {
    try {
        const posts = await Post.find({});
        return posts;
    } catch (error) {
        throw Error('Error fetching all posts.');
    }
};

export const findPostById = async (id: number) => {
    try {
        const post = await Post.findOne({ id });
        return post;
    } catch (error) {
        throw new Error('Error finding post by id');
    }
};

export const createPost = async (
    userId: number,
    title: string,
    content: string
) => {
    try {
        const createdPost = await Post.create({
            title,
            content,
            userId,
        }).save();
        return createdPost;
    } catch (error) {
        throw Error('Error creating post.');
    }
};

export const deletePost = async (id: number) => {
    try {
        const deletedPost = await Post.delete({ id });
        return deletedPost;
    } catch (error) {
        throw new Error('Error deleting poss');
    }
};
