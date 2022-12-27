/* eslint-disable prettier/prettier */
import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, Timestamp, UpdateDateColumn } from 'typeorm';
import { Tipo } from '../../tipo/entities/tipo.entity';
import { Familia } from '../../familia/entities/familia.entity';

@Entity('grupo')
export class Grupo {

    @PrimaryColumn('int', {
        primary: true,
        unique: true,
        nullable: false
    })
    id: string;

    @Column('text', {
        unique: true,
        nullable: false
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
    
    // relaciones

    @ManyToOne(
        () => Tipo,
        (tipo) => tipo.grupo
    )
    tipo: Tipo;

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
        () => Familia,
        (familia) => familia.grupo
    )
    familia: Familia;
}