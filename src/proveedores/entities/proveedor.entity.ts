/* eslint-disable prettier/prettier */

import { ColumnNumericTransformer } from "src/comon/functions/typeorm";
import { Direccion } from "src/core/direccion/entities/direccion.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('Proveedor')
export class Proveedor {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false
  })
  denominacion: string; 
    
  //----------------------------
  @Column('text', {
    unique: true
  })
  codigo: string;
  
  //----------------------------
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Timestamp;
  
  //----------------------------
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Timestamp;
  
  //----------------------------
  @Column('smallint', {
  })
  codigoDeGrupo: number;

  //----------------------------
  @Column('text', {
    nullable: true,
  })
  telefono1?: string;

  //----------------------------
  @Column('int', {
    nullable: true,
  })
  fax?: number;
  //
  //----------------------------
  @Column('numeric', {
    default: 0,
    precision: 12,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  saldo: number;

  //----------------------------
  @Column('numeric', {
    default: 0,
    precision: 12,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  saldoPendiente: number;

  //----------------------------
  @Column('numeric', {
    default: 0,
    precision: 12,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  saldoPedidosPendientes: number;

  //----------------------------

  @Column('numeric', {
    default: 0,
    precision: 12,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  limiteDeuda: number;
  //----------------------------

  @Column('smallint', {
    default: 0,
  })
  descuento: number;
  
  //----------------------------

  @Column('smallint', {
    default: 0,
  })
  movil: number;

  //----------------------------

  @Column('text', {
    nullable: false
  })
  nif: string;

  //----------------------------

  @Column('text', {
    nullable: true,
  })
  observaciones: string; 
  //----------------------------

  @Column('text', {
    nullable: true,
    default: 'EUR'
  })
  moneda: string; 
  //----------------------------

  @Column('text', {
    nullable: true
  })
  email: string; 

  //----------------------------

  @Column('text', {
    nullable: true,
  })
  cuentaBanco: string; 
  //----------------------------

  @Column('text', {
    nullable: true,
  })
  IBAN: string; 
  //----------------------------

  @Column('bool',{
    default: false
  })
  activo: boolean;

  //----------------------------
  @ManyToOne(
    () => User,
    (user) => user.proveedor
  )
  administrador: User | number | undefined;


  // --------------------------
  @OneToMany(
      () => Direccion,
      (direccion) => direccion.proveedor,
      { cascade : true }
  )
  direccion: Direccion;
}
