import {
    BaseEntity,
    BeforeInsert,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import { Post } from '../Post/model';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    username!: string;

    @Column()
    password!: string;

    @Column('text', { nullable: true })
    bio: string;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];

    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    async matchPasswords(password: string) {
        return await bcrypt.compare(password, this.password);
    }
}
