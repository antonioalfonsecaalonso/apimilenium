/* eslint-disable prettier/prettier */
import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity('color')
export class Color {

    @PrimaryColumn('int', {
        unique: true,
        nullable: false
    })
    id: string;

    @Column('text', {
        unique: true,
        nullable: false
    })
    color: string;
    
    @Column('int', {
        unique: true,
        nullable: false
    })
    lineId: number;

    @CreateDateColumn()
    createdAt?: Timestamp;
    
    @UpdateDateColumn()
    updatedAt?: Timestamp;

    @ManyToOne(
        () => User,
        (user) => user.color
    )
    createdBy: User;

    @ManyToOne(
        () => User,
        (user) => user.color
    )
    updatedBy: User;

}

