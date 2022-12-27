/* eslint-disable prettier/prettier */
import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity('talla')
export class Talla {
   // 
    @PrimaryGeneratedColumn('rowid')
    id: string;

    @Column('text', {

    })
    code: string;

    @Column('text', {})
    name: string;

    @Column('text', {})
    docEntry : number;

    @Column('boolean', {
        default: false
    })
    canceled: boolean;

    @Column('text', {})
    object: string;

    @Column('text', {})
    dataSource: string;

    @CreateDateColumn()
    createdAt?: Timestamp;
    
    @UpdateDateColumn()
    updatedAt?: Timestamp;

    @Column('int', {
        default: 0
    })
    lineId: number;

    @Column('text', {
        default: ''
    })
    tallaDesc: string;

    @ManyToOne(
        () => User,
        (usuario) => usuario.talla
    )
    createdBy: User;

    @ManyToOne(
        () => User,
        (usuario) => usuario.talla
    )
    updatedBy: User;

}
