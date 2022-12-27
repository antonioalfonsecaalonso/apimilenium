/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, Timestamp, UpdateDateColumn } from 'typeorm';
import { Grupo } from '../../grupo/entities/grupo.entity';

@Entity('familia')
export class Familia {

    @PrimaryColumn('text', {
        unique: true
    })
    id: string;

    @Column('text', {
        unique: true
    })
    name: string;
    
    @Column('text', {
    })
    tipa: string;

    @Column('int', {})
    docEntry: number;

    @Column('bool', {
        default: true
    })
    active: boolean;

    @CreateDateColumn()
    createdAt?: Timestamp;
    
    @UpdateDateColumn()
    updatedAt?: Timestamp;

    // Relaciones
    @ManyToOne(
        () => Grupo,
        (grupo) => grupo.familia
    )
    grupo: Grupo;
}

