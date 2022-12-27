/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsDecimal, IsEmail, IsIBAN, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, isUUID, Max, MaxLength, Min, MinLength, Validate } from 'class-validator';
import { Timestamp } from 'typeorm';
import { errorCodeUser } from 'src/errors/errorCode';
import { User } from 'src/user/entities/user.entity';
import { Direccion } from '../../core/direccion/entities/direccion.entity';

/* eslint-disable prettier/prettier */
export class CreateProveedorDto {

    //---------------------------------------------------------------------
    @ApiProperty({
        name: 'name',
        description: 'Ingreso del nombre del usuario que se esta registrando.',
        default: 'Denominación'
    })
    @IsString({
        message: "El campo DENOMINACION no puede ser numeral.",
    })
    @MinLength(3, {
        message: "El campo DENOMINACION no puede ser Inferior a 3 carácteres.",
    })
    @MaxLength(50, {
        message: "El campo DENOMINACION no puede ser Superior a 50 carácteres.",
    })
    @IsNotEmpty({
        message: "El campo DENOMINACION no puede estar vacío.",
    })
    denominacion: string;


    //----------------------------------------------------------------------
    @ApiProperty({
        name: 'Usuario',
        description: 'Pertenece a la clase de Usuario.',
    })
    @IsNotEmpty({
        message: "El campo Administrador no puede estar vacío.",
    })
    administrador: User | number | undefined;

    //----------------------------------------------------------------------
    @ApiProperty({
        name: 'codigo',
        description: 'Lo que conocemos como los P000...',
    })
    @IsOptional()
    codigo: string;

    //-----------------------------------------------------------------------
    @ApiProperty({
        name: 'createdAt',
        description: 'La fecha a la que se registra la empresa, no hace falta proporcionarla.',
        type: () => { return typeof Timestamp }
    })
    @IsDate()
    @IsOptional()
    createdAt: Timestamp;

    //-----------------------------------------------------------------------
    
    @ApiProperty({
        name: 'updatedAt',
        description: 'La fecha a la que se actualiza la empresa, no hace falta proporcionarla.',
        type: () => typeof Timestamp
    })
    @IsDate()
    @IsOptional()
    updatedAt: Timestamp;
    
    //-----------------------------------------------------------------------
    @ApiProperty({
        name: 'codigoDeGrupo',
        description: 'El codigo del grupo.',
        default: '',
    })
    @IsDate()
    @IsOptional()
    codigoDeGrupo: number;
    //-----------------------------------------------------------------------
    @ApiProperty({
        name: 'telefono',
        description: 'Ingreso del teléfono de la empresa que se esta registrando.',
        default: '636124366'
    })
    @IsString({
        message: "El campo TELÉFONO, ha de ser cadena."
    })
    @IsNotEmpty({
        message: "El TELÉFONO nombre no puede estar vacío.",
        context: {
            errorCode: 9023,
            developNote: errorCodeUser(9023)
        }
    })
    telefono1: string;
//
    //-----------------------------------------------------------------------
    @ApiProperty({
        name: 'fax',
        description: 'Ingreso del fax  que se esta registrando.',
    })
    @IsNumber({},{
        message: "El campo Fax, ha de ser numérico."
    })
    @IsOptional()
    fax: number;

    //-----------------------------------------------------------------------
    @ApiProperty({
        name: 'saldo',
        description: 'saldo actual a favor del proveedor.',
    })
    @IsDecimal({},{
        message: "El campo saldo, ha de ser decimal."
    })
    @IsOptional()
    saldo: number;

    //-----------------------------------------------------------------------
    @ApiProperty({
        name: 'saldoPendiente',
        description: 'saldo que el proveedor tiene pendiente.',
    })
    @IsDecimal({},{
        message: "El campo saldoPendiente, ha de ser decimal."
    })
    @IsOptional()
    saldoPendiente: number;

    //-----------------------------------------------------------------------
    @ApiProperty({
        name: 'limiteDeuda',
        description: 'Límite de la deuda que el proveedor tiene asignada.',
    })
    @IsDecimal({},{
        message: "El campo limiteDeuda, ha de ser decimal."
    })
    @IsOptional()
    limiteDeuda: number;

    //-----------------------------------------------------------------------
    @ApiProperty({
        name: 'descuento',
        description: 'Descuento que el proveedor nos aplica.',
    })
    @IsInt({
        message: "El campo Descuento, ha de ser decimal."
    })
    @IsOptional()
    descuento: number;
    
    //-----------------------------------------------------------------------
    @ApiProperty({
        name: 'movil',
        description: 'Móvil del proveedor.',
    })
    @IsInt({
        message: "El campo Movil, ha de ser número."
    })
    @IsOptional()
    movil: number;

    //-----------------------------------------------------------------------
    @ApiProperty({
        name: 'nif',
        description: 'NIF del proveedor.',
    })
    @IsString({
        message: "El campo nif, ha de ser una cadena."
    })
    @IsNotEmpty({
        message: "El NIF nombre no puede estar vacío.",
    })
    nif: string;

    //-----------------------------------------------------------------------
    @ApiProperty({
        name: 'observaciones',
        description: 'Observaciones para el proveedor.',
    })
    @IsString({
        message: "El campo Observaciones, ha de ser una cadena."
    })
    @IsOptional()
    observaciones: string;

    //-----------------------------------------------------------------------
    @ApiProperty({
        name: 'Moneda',
        description: 'Moneda que usará el proveedor.',
    })
    @IsString({
        message: "El campo Moneda, ha de ser una cadena.",
    })
    @IsOptional({
        
    })
    moneda: string; 

    //-----------------------------------------------------------------------
    @ApiProperty({
        name: 'email',
        description: 'Ingreso del Email del proveedore que se esta registrando.'
    })
    @IsEmail({},{
        message: "El campo EMAIL no parece ser un email válido.",
        context: {
            errorCode: 9009,
            developNote: errorCodeUser(9009)
        }
    })
    @IsNotEmpty({
        message: "El EMAIL no puede estar vacío.",
        context: {
            errorCode: 9024,
            developNote: errorCodeUser(9024)
        }
    })
    email: string;

    //-----------------------------------------------------------------------
    @ApiProperty({
        name: 'CuentaBanco',
        description: 'cuenta del banco que usará el proveedor.',
    })
    @IsString({
        message: "El campo Cuenta del banco, ha de ser una cadena."
    })
    @IsOptional()
    cuentaBanco: string;  

    //-----------------------------------------------------------------------
    @ApiProperty({
        name: 'IBAN',
        description: 'IBAN cuenta del banco que usará el proveedor.',
    })
    @IsString({
        message: "El campo IBAN, ha de ser una cadena."
    })
    @IsOptional()
    @IsIBAN()
    IBAN: string; 

    //-----------------------------------------------------------------------
    @ApiProperty({
        name: 'active',
        description: 'Marcar si el proveedor está activo o no.',
    })
    @IsBoolean({
        message: "El campo activo ha de ser verdadero o falso."
    })
    @IsOptional()
    activo: boolean;

    //-----------------------------------------------------------------------
    @ApiProperty({
        name: 'Direccion',
        description: 'direccion del proveedor'
    })
    @IsNotEmpty({
        message: 'Debe de proporcionar una dirección para el proveedor.'
    })
    direccion: Direccion;

}
