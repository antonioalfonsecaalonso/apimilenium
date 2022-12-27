/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';
import { Pais } from 'src/core/pais-provincia-ciudad/pais/entities/pais.entity';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn, Timestamp, ManyToOne, OneToMany } from 'typeorm';
import { Direccion } from 'src/core/direccion/entities/direccion.entity';
import { Provincia } from 'src/core/pais-provincia-ciudad/provincia/entities/provincia.entity';
import { Ciudad } from 'src/core/pais-provincia-ciudad/ciudad/entities/ciudad.entity';
import { Proveedor } from 'src/proveedores/entities/proveedor.entity';
import { Talla } from '../../products/tallas/entities/talla.entity';
import { Color } from '../../products/color/entities/color.entity';
import { Tipo } from 'src/products/tipo/entities/tipo.entity';
import { Grupo } from '../../products/grupo/entities/grupo.entity';
import { Temporada } from 'src/products/temporada/entities/temporada.entity';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
  })
  name: string;
  
  @Column('text', {
    nullable: false,
  })
  apellido1: string;
  
  @Column('text', {
    nullable: false,
  })
  apellido2: string;
  
  @Column('int', {
    nullable: true,
  })
  telefono?: number;
  
  @Column('text', {
    nullable: false,
    unique: true
  })
  email: string;
  
  @Column('text', {
    nullable: false,
  })
  dni: string;
  
  @Column('text', {
    nullable: false,
  })
  sexo: string;

  
  
  @Column('text', {
    nullable: false,
  })
  password: string;
  
  @Column('text')
  usuario: string;
  
  @Column("text", { array: true })
  roles: string[];
  
  @CreateDateColumn()
  createdAt?: Timestamp;
  
  @UpdateDateColumn()
  updatedAt?: Timestamp;
  
  @Column('boolean', {
    nullable: false,
    default: false
  })
  active?: boolean;
  
  // relaciones.
  @ManyToOne(
    () => Pais,
    (pais) => pais.usuario
  )
  pais: Pais;

  @ManyToOne(
    () => Provincia,
    (provincia) => provincia.usuario
  )
  provincia: Provincia;

  @ManyToOne(
    () => Ciudad,
    (ciudad) => ciudad.usuario
  )
  ciudad: Ciudad;

  @OneToMany(
    () => Direccion,
    (direccion) => direccion.usuario,
    { cascade : true }
  )
  direccion: Direccion;

  @OneToMany(
    () => Proveedor,
    (proveedor) => proveedor.administrador,
  )
  proveedor: Proveedor;

  @OneToMany(
    () => Talla,
    (talla) => {
      talla.createdBy,
      talla.updatedBy
    }
  )
  talla: Talla;

  @OneToMany(
    () => Color,
    (color) => {
      color.createdBy,
      color.updatedBy
    }
  )
  color: Color

  @OneToMany(
    () => Tipo,
    (tipo) => {
      tipo.createdBy,
      tipo.updatedBy
    }
  )
  tipo: Tipo

  @OneToMany(
    () => Grupo,
    (grupo) => {
      grupo.createdBy,
      grupo.updatedBy
    }
  )
  grupo: Grupo;
  
  @OneToMany(
    () => Temporada,
    (temporada) => {
      temporada.createdBy,
      temporada.updatedBy
    }
  )
  temporada: Temporada;
  // -------------------------------
  @BeforeInsert()
  async validate() {
    
    if(!this.usuario){
      this.usuario = this.email;
    }

    this.usuario   = this.usuario.toLocaleLowerCase();
    this.sexo      = this.sexo.toLocaleLowerCase();
    this.apellido2 = this.apellido2.toLocaleLowerCase();
    this.apellido1 = this.apellido1.toLocaleLowerCase();
    this.name      = this.name.toLocaleLowerCase();
    this.active    = false;
    const salt = await bcrypt.genSalt();
    this.password  = await bcrypt.hash(this.password, salt);
    
  }
  // @BeforeInsert()
  // checkSlugInsert(){
  //   console.log("entra");
  //   if(!this.usuario) {
  //     this.usuario = this.email;
  //   }
  //   console.log(this.usuario, this.email);
  // }
  // @Column('text', {
  //   array: true,
  // })
  // empresa: EmpresasInterface;
}

