/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('instalaciones')
export class Instalaciones {
    
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('boolean', {
    default: 0
  })
  usuarioDB: boolean;

  @Column('boolean', {
    default: 0
  })
  permisosDB: boolean;

  @Column('boolean', {
    default: 0
  })
  productDB: boolean;

  @Column('boolean', {
    default: 0
  })
  paisDB: boolean;
  
  @Column('boolean', {
    default: 0
  })
  provinciaDB: boolean;

  @Column('boolean', {
    default: 0
  })
  ciudadDB: boolean;
}
