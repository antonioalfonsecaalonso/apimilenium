/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Direccion } from 'src/core/direccion/entities/direccion.entity';
import { Pais } from '../../pais/entities/pais.entity';
import { Ciudad } from '../../ciudad/entities/ciudad.entity';
import { Proveedor } from 'src/proveedores/entities/proveedor.entity';

@Entity('provincias')
export class Provincia {

    @PrimaryColumn({
        unique: true
    })
    id : number;

    @Column('text', {
    })
    name : string;

    @Column('text', {
        nullable: true
    })
    state_code?: string;

    @ManyToOne(
        () => Pais,
        (pais) => pais.provincias
    )
    pais: Pais;
    
    @OneToMany(
        () => Ciudad,
        (ciudad) => ciudad.provincia,
        { cascade : true }
        )
        ciudades: Ciudad;

    @OneToMany(
        () => Direccion,
        (direccion) => direccion.provincia,
        { cascade : true }
    )
    direccion: Direccion;
        
    // @OneToMany(
    //     () => Proveedor,
    //     (proveedor) => proveedor.direccion,
    //     { cascade : true }
    // )
    // proveedor: Proveedor;
    
    @OneToMany(
        () => User,
        (usuario) => usuario.provincia,
        { cascade : true }
    )
    usuario: User;
}
