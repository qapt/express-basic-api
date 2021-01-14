import { createConnection } from 'typeorm';
import { User } from '../components/User/model';
import { Post } from './../components/Post/model';

export const connectDB = async () => {
    await createConnection({
        type: 'postgres',
        url: process.env.DB_URL,
        entities: [User, Post],
        synchronize: true,
        logging: false,
        // migrations: [path.join(__dirname, './migrations/*')],
        // await conn.runMigrations();
        // await Post.delete({});
    });
    console.log('Connected to PostgresDB');
};
