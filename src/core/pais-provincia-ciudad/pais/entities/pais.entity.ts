/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Direccion } from "src/core/direccion/entities/direccion.entity";
import { Provincia } from "../../provincia/entities/provincia.entity";

@Entity('paises')
export class Pais {

    @PrimaryColumn({
        unique: true
    })
    id : number;

    @Column('text', {
    })
    iso2: string;

    @Column('text', {
    })
    iso3: string;

    @Column('text', {
    })
    name: string;

    @OneToMany(
        () => Provincia,
        (provincia) => provincia.pais,
        { cascade : true }
    )
    provincias: Provincia;

    // @OneToMany(
    //     () => Proveedor,
    //     (proveedor) => proveedor.direccion,
    //     { cascade : true }
    // )
    // proveedor: Proveedor;

    @OneToMany(
        () => User,
        (usuario) => usuario.pais,
        { cascade : true }
    )
    usuario: User;



    @OneToMany(
        () => Direccion,
        (direccion) => direccion.usuario,
        { cascade : true }
    )
    direccion: Direccion;

}
