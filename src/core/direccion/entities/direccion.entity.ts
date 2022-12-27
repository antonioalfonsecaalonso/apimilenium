/* eslint-disable prettier/prettier */
import { Ciudad } from 'src/core/pais-provincia-ciudad/ciudad/entities/ciudad.entity';
import { Pais } from 'src/core/pais-provincia-ciudad/pais/entities/pais.entity';
import { Provincia } from 'src/core/pais-provincia-ciudad/provincia/entities/provincia.entity';
import { Proveedor } from 'src/proveedores/entities/proveedor.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity('DIRECCION')
export class Direccion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text',{})
    calle: string;

    @Column('text',{
        default : 'principal'
    })
    tipo: string;

    @Column('text',{
        default : '00000'
    })
    codigoPostal: string;

    @ManyToOne(
        () => Pais,
        (pais) => pais.direccion
    )
    pais: Pais | number;

    @ManyToOne(
        () => Provincia,
        (provincia) => provincia.direccion
    )
    provincia: Provincia | number;

    @ManyToOne(
        () => Ciudad,
        (ciudad) => ciudad.direccion
    )
    ciudad: Ciudad | number;

    @ManyToOne(
        () => User,
        (usuario) => usuario.direccion
    )
    usuario?: User | string;

    @ManyToOne(
        () => Proveedor,
        (proveedor) => proveedor.direccion
    )
    proveedor: Proveedor;
    
}
