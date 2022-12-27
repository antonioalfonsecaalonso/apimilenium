/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('articulo')
export class Product {
   
    // proveedor: 'P00001',


    // color: 'UNICO',
    // tallaje: 'ADULALF',
    // codigoColor: '10065',
    // talla: '2S',
    // codigoFamilia: '0452',
    // codigoSubfamilia: '0041'


    @PrimaryColumn('int', {
        nullable: false,
        unique: true
    })
    id: number; // esto es el docentry del sap

    @Column('text',
    {
       unique: true,
       nullable: false,
    })
    code: string;

    @Column('text',
    {
       unique: true,
       nullable: false,
    })
    nombre: string
    
    @Column('int', {
        default: 0
    })
    grupo: number
    
    @Column('text', {
        nullable: true,
        unique: true
    })
    codebars: string;
    
    @Column('int', {
        default: 0
    })
    stock: number
    
    @Column('text', {})
    catalogoProveedor: string;
    
    @Column('numeric', {
        default: 0.00
    })
    ultimoPrecioEvaluado: number
    
    @Column('numeric', {
        default: 0.00
    })
    ultimoPrecioCompra: number
    
    @Column('date', {
        nullable: true
    })
    ultimaFechaDeCompra: Date

    @Column('date', {
        nullable: true
    })
    creacion: Date
    
    @Column('date', {
        nullable: true
    })
    actualizacion: Date
    
    @Column('numeric', {
        default: 0.00
    })
    precioCompra: number
    
    @Column('text', {
        nullable: true
    })
    referencia: string;
    
    @Column('text', {
        nullable: false,
        unique: true
    })
    modelo: string;
    
    @Column('text', {
        nullable: true
    })
    temporada: string;

    @Column('text', {
        nullable: true
    })
    plantillaMedia: string;
    
    
    
    


    @Column('text', {
        nullable: true,
        unique: true
    })
    slug: string;
    
    @BeforeInsert()
    checkSlugInsert(){}

    @BeforeUpdate()
    checkSlugUpdate(){}

}
