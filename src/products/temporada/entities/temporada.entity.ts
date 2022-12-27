/* eslint-disable prettier/prettier */
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('temporada')
export class Temporada {

    // DocEntry: 37,
    @PrimaryColumn('int')
    id: number;

    @Column('text', {
        unique: true
    })
    code: string;

    @Column('text', {
        unique: true
    })
    name: string;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    @ManyToOne(
        () => User,
        (user) => user.temporada
    )
    createdBy: User;

    @ManyToOne(
        () => User,
        (user) => user.temporada
    )
    updatedBy: User;
}
