/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, MinLength } from "class-validator";
import { Ciudad } from "src/core/pais-provincia-ciudad/ciudad/entities/ciudad.entity";
import { Pais } from "src/core/pais-provincia-ciudad/pais/entities/pais.entity";
import { Provincia } from "src/core/pais-provincia-ciudad/provincia/entities/provincia.entity";
import { Proveedor } from "src/proveedores/entities/proveedor.entity";
import { User } from "src/user/entities/user.entity";

export class CreateDireccionDto {
    
    @ApiProperty({
        name: 'Proveedor',
        description: 'Ingreso del proveedor.'
    })
    @IsOptional()
    proveedor: Proveedor;
    
    // -------------------------------------------------------------------------------
    @ApiProperty({
        name: 'usuario',
        description: 'Ingreso del Usuario.',
        default: ''
    })
    @IsOptional()
    usuario: User;
    
    // -------------------------------------------------------------------------------
    @ApiProperty({
        name: 'pais',
        description: 'Ingreso del País.',
        default: ''
    })
    @IsNotEmpty({
        message: "El campo País no puede estar vacío.",
        context: {
            errorCode: 9019,
            developNote: "Falla el campo países en la creación de la dirección."
        }
    })
    pais: Pais | number;
    
    // -------------------------------------------------------------------------------
    @ApiProperty({
        name: 'provincia',
        description: 'Ingreso del provincia.',
        default: ''
    })
    @IsNotEmpty({
        message: "El campo Provincia no puede estar vacío.",
        context: {
            errorCode: 9019,
            developNote: "Falla el campo países en la creación de la dirección."
        }
    })
    provincia: Provincia | number;

    // -------------------------------------------------------------------------------
    @ApiProperty({
        name: 'ciudad',
        description: 'Ingreso de la ciudad.',
        default: ''
    })
    @IsNotEmpty({
        message: "El campo Ciudad no puede estar vacío.",
        context: {
            errorCode: 9019,
            developNote: "Falla el campo Ciudades en la creación de la dirección."
        }
    })
    ciudad: Ciudad | number;

    // -------------------------------------------------------------------------------
    @ApiProperty({
        name: 'calle',
        description: 'Ingreso de la direccion de la empresa que se esta registrando.',
        default: 'Calle'
    })
    @IsString({
        message: "El campo CALLE no puede ser numeral.",
    })
    @MinLength(3, {
        message: "El campo CALLE no puede ser Inferior a 3 carácteres.",
    })
    @MaxLength(50, {
        message: "El campo CALLE no puede ser Superior a 50 carácteres.",
    })
    @IsNotEmpty({
        message: "El campo CALLE no puede estar vacío.",
    })
    calle: string;

    //----------------------------------------------------------------------
    @ApiProperty({
        name: 'calle',
        description: 'Campo en la que delimitamos la calle.',
    })
    @IsNumber({

    }, {
        message: "El campo número ha de ser un entero positivo."
    })
    @IsNotEmpty({
        message: "El campo número no puede estar vacío."
    })
    @IsPositive({
        message: "El campo número ha de ser Positivo"
    })
    numero: number;
    //----------------------------------------------------------------------
    @ApiProperty({
        name: 'codigoPostal',
        description: 'Campo en la que delimitamos el coódigo Postal.',
    })
    @IsNumber({
    }, {
        message: "El campo cp ha de ser un entero positivo."
    })
    @IsOptional()
    codigoPostal: string;
}
