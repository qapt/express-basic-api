import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../User/model';

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column('text')
    content!: string;

    @Column()
    userId!: number;

    @ManyToOne(() => User, (user) => user.posts)
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;
}
