import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { RelationCountMetadata } from 'typeorm/metadata/RelationCountMetadata';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
}