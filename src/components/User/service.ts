import { User } from './model';

// TODO: handle catch errors
export const findUserById = async (userId: number) => {
    try {
        const user = await User.findOne({ id: userId });
        return user;
    } catch (error) {
        throw Error('Error finding user by id');
    }
};

export const findUserByUsername = async (username: string) => {
    try {
        const user = await User.findOne({ username });
        return user;
    } catch (error) {
        throw Error('Error finding user by username');
    }
};

export const createUser = async (
    username: string,
    password: string,
    bio: string
) => {
    try {
        const newUser = await User.create({
            username,
            password,
            bio,
        }).save();
        // INSERT INTO user (username, password, bio) VALUES $1, $2, $3 [username, password, bio]

        return newUser;
    } catch (error) {
        throw Error('Error creating new user');
    }
};

export const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw Error('Error fetching all users');
    }
};
