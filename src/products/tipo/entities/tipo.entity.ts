/* eslint-disable prettier/prettier */
import { Grupo } from "src/products/grupo/entities/grupo.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('tipo')
export class Tipo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', {
        unique: true
    })
    name: string;

    @CreateDateColumn()
    createdAt?: Timestamp;
    
    @UpdateDateColumn()
    updatedAt?: Timestamp;

    @Column('bool', {
        default: true
    })
    active: boolean;

    // relations

    @ManyToOne(
        () => User,
        (user) => user.tipo
    )
    createdBy: User;
    
    @ManyToOne(
        () => User,
        (user) => user.tipo
    )
    updatedBy: User;

    @OneToMany(
        () => Grupo,
        (grupo) => {
          grupo.tipo
        }
    )
    grupo: Grupo;

}
