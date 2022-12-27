/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Direccion } from "src/core/direccion/entities/direccion.entity";
import { User } from "src/user/entities/user.entity";
import { Provincia } from "../../provincia/entities/provincia.entity";

@Entity("ciudades")
export class Ciudad {
    
    @PrimaryColumn({
        unique: true
    })
    id : number;

    @Column('text', {
    })
    name : string;

    @Column('smallint', {
        nullable: true
    })
    cp? : number;


    @ManyToOne(
        () => Provincia,
        (provincia) => provincia.ciudades
    )
    provincia: Provincia;

    // @OneToMany(
    //     () => Proveedor,
    //     (proveedor) => proveedor.direccion,
    //     { cascade : true }
    // )
    // proveedor: Proveedor;

    @OneToMany(
        () => User,
        (usuario) => usuario.ciudad,
        { cascade : true }
    )
    usuario: User;

    @OneToMany(
        () => Direccion,
        (usuario) => usuario.ciudad,
        { cascade : true }
    )
    direccion: Direccion;
}
