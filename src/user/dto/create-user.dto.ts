/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDate, IsEmail, IsEnum, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength,  Min,  MinLength } from "class-validator";
import { AppRoles } from "src/app.roles";
import { errorCodeUser } from "src/errors/errorCode";
import { Timestamp } from 'typeorm';
import { Pais } from '../../core/pais-provincia-ciudad/pais/entities/pais.entity';
import { Provincia } from '../../core/pais-provincia-ciudad/provincia/entities/provincia.entity';
import { Ciudad } from '../../core/pais-provincia-ciudad/ciudad/entities/ciudad.entity';
              
export class CreateUserDto {
    
    //----------------------------------------------------------------------
    @ApiProperty({
        name: 'name',
        description: 'Ingreso del nombre del usuario que se esta registrando.',
        default: 'Usuario1'
    })
    @IsString({
        message: "El campo NOMBRE no puede ser numeral.",
        context: {
            errorCode: 9020,
            developNote: errorCodeUser(9002)
        }
    })
    @MinLength(3, {
        message: "El campo NOMBRE no puede ser Inferior a 3 carácteres.",
        context: {
            errorCode: 9001,
            developNote: errorCodeUser(9001)
        }
    })
    @MaxLength(50, {
        message: "El campo NOMBRE no puede ser Superior a 50 carácteres.",
        context: {
            errorCode: 9002,
            developNote: errorCodeUser(9002)
        }
    })
    @IsNotEmpty({
        message: "El campo NOMBRE no puede estar vacío.",
        context: {
            errorCode: 9019,
            developNote: errorCodeUser(9019)
        }
    })
    name: string;
    // //----------------------------------------------------------------------
    @ApiProperty({
        name: 'apellido1',
        description: 'Ingreso del apellido 1 del usuario que se esta registrando.',
        default: 'Apellido1'
    })
    @IsString()
    @MinLength(3, {
        message: "El campo PRIMER APELLIDO no puede ser Inferior a 3 carácteres.",
        context: {
            errorCode: 9003,
            developNote: errorCodeUser(9003)
        }
    })
    @MaxLength(50, {
        message: "El campo PRIMER APELLIDO no puede ser Superior a 50 carácteres.",
        context: {
            errorCode: 9004,
            developNote: errorCodeUser(9004)
        }
    })
    @IsNotEmpty({
        message: "El campo PRIMER APELLIDO no puede estar vacío.",
        context: {
            errorCode: 9021,
            developNote: errorCodeUser(9021)
        }
    })
    apellido1: string;
    
    // //----------------------------------------------------------------------
    @ApiProperty({
        name: 'apellido2',
        description: 'Ingreso del apellido 2 del usuario que se esta registrando.',
        default: 'Apellido 2'
    })
    @IsString()
    @MinLength(3, {
        message: "El campo SEGUNDO APELLIDO no puede ser Inferior a 3 carácteres.",
        context: {
            errorCode: 9005,
            developNote: errorCodeUser(9005)
        }
    })
    @MaxLength(50, {
        message: "El campo SEGUNDO APELLIDO no puede ser Superior a 50 carácteres.",
        context: {
            errorCode: 9006,
            developNote: errorCodeUser(9006)
        }
    })
    @IsNotEmpty({
        message: "El SEGUNDO APELLIDO nombre no puede estar vacío.",
        context: {
            errorCode: 9022,
            developNote: errorCodeUser(9022)
        }
    })
    apellido2: string;
    // //----------------------------------------------------------------------
    @ApiProperty({
        name: 'telefono',
        description: 'Ingreso del teléfono del usuario que se esta registrando.',
        default: '636124366'
    })
    @IsNumber({},{
        message: "El campo TELÉFONO, ha de ser numérico."
    })
    @Min(600000000,{
        message: "El campo TELÉFONO ha de ser de 9 números.",
        context: {
            errorCode: 9007,
            developNote: errorCodeUser(9007)
        }
    } )
    @Max(799999999, {
        message: "El campo TELÉFONO ha de ser de 9 números.",
        context: {
            errorCode: 9008,
            developNote: errorCodeUser(9008)
        }
    })
    @IsNotEmpty({
        message: "El TELÉFONO nombre no puede estar vacío.",
        context: {
            errorCode: 9023,
            developNote: errorCodeUser(9023)
        }
    })
    telefono: number;
    
    // //----------------------------------------------------------------------
    @ApiProperty({
        name: 'email',
        description: 'Ingreso del Email del usuario que se esta registrando.',
        default: 'milenium@gmail.com'
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
    
    // //----------------------------------------------------------------------
    @ApiProperty({
        name: 'dni',
        description: 'Ingreso del DNI del usuario que se esta registrando.',
        default: '47665988J'
    })
    @IsString()
    @MinLength(9, {
        message: "El campo DNI no puede ser Inferior a 9 carácteres.",
        context: {
            errorCode: 9010,
            developNote: errorCodeUser(9010)
        }
    })
    @MaxLength(9, {
        message: "El campo DNI no puede ser Superior a 9 carácteres.",
        context: {
            errorCode: 9011,
            developNote: errorCodeUser(9011)
        }
    })
    @IsNotEmpty({
        message: "El DNI no puede estar vacío.",
        context: {
            errorCode: 9025,
            developNote: errorCodeUser(9025)
        }
    })
    dni: string;
    
    // //----------------------------------------------------------------------
    @ApiProperty({
        name: 'sexo',
        description: 'Ingreso del SEXO del usuario que se esta registrando.',
        default: 'mujer'
    })
    @IsString()
    @IsNotEmpty({
        message: 'El campo SEXO no puede aparecer vacío.',
        context: {
            errorCode: 9012,
            developNote: errorCodeUser(9012)
        }
    })
    @IsIn(['hombre', 'mujer'],{
        message: errorCodeUser(9026),
        context: {
            errorCode: 9026,
            defelopNote: errorCodeUser(9026)
        }
    })
    sexo: string;
    // //----------------------------------------------------------------------
    @ApiProperty({
        name: 'password',
        description: 'Ingreso del password del usuario que se esta registrando.',
        default: '12345'
    })
    @IsString()
    @MinLength(3, {
        message: "El campo PASSWORD no puede ser Inferior a 3 carácteres.",
        context: {
            errorCode: 9013,
            developNote: errorCodeUser(9013)
        }
    })
    @MaxLength(15, {
        message: "El campo PASSWORD no puede ser Superior a 15 carácteres.",
        context: {
            errorCode: 9014,
            developNote: errorCodeUser(9014)
        }
    })
    @IsNotEmpty({
        message: "El Password no puede estar vacío.",
        context: {
            errorCode: 9027,
            developNote: errorCodeUser(9027)
        }
    })
    password: string;
   
    // //----------------------------------------------------------------------
    @ApiProperty({
        enum: {AppRoles},
        name: 'roles',
        description: 'Ingreso de los roles del usuario que se esta registrando.',
        default: '["SUPERADMIN"]'
    })
    @IsNotEmpty({
        message: "El Permisos no puede estar vacío.",
        context: {
            errorCode: 9028,
            developNote: errorCodeUser(9028)
        }
    })
    @IsArray()
  //  @IsIn(AppRolesArray, {each:true})
    @IsEnum(AppRoles, {each: true})
    roles: string[];
    
    // //----------------------------------------------------------------------
    @ApiProperty({
        name: 'createdAt',
        description: 'La fecha a la que se registra el usuario, no hace falta proporcionarla.',
        default: '',
        type: String
    })
    @IsDate()
    @IsOptional()
    createdAt?: Timestamp;
    
    //----------------------------------------------------------------------
    @ApiProperty({
        name: 'updatedAt',
        description: 'La fecha a la que se registra el usuario, no hace falta proporcionarla.',
        default: '',
        type: String
    })
    @IsDate()
    @IsOptional()
    updatedAt?: Timestamp;

    //----------------------------------------------------------------------
    @ApiProperty({
        name: 'active',
        description: 'Campo para saber si el usuario está activo o no.',
        default: false,
        type: Boolean
    })
    @IsBoolean()
    @IsOptional()
    active: boolean;
     //----------------------------------------------------------------------
     @ApiProperty({
        name: 'usuario',
        description: 'Nombre del usuario en cuestión.',
        default: 'milenium',
        type: String
    })
     @IsString()
     @MinLength(3, {
         message: "El campo USUARIO no puede ser Inferior a 3 carácteres.",
         context: {
             errorCode: 9015,
             developNote: errorCodeUser(9013)
         }
     })
     @MaxLength(100, {
         message: "El campo USUARIO no puede ser Superior a 100 carácteres.",
         context: {
             errorCode: 9016,
             developNote: errorCodeUser(9014)
         }
     })
     @IsOptional()
     usuario?: string;
     //----------------------------------------------------------------------
     @ApiProperty({
        name: 'pais',
        description: 'Ingresar el pais Comleto, se usara para las busquedas.',
        type: String
    })
     pais: Pais;

     @ApiProperty({
        name: 'pais',
        description: 'Ingresar el pais, se usara para el ingreso, debido a la base de datos Dexie.',
        type: String
    })
     @IsNumber()
     paisId: number;
     //----------------------------------------------------------------------
     @ApiProperty({
        name: 'provincia',
        description: 'Ingresar la provincia.',
        type: Provincia
    })
     provincia: Provincia;

     @ApiProperty({
        name: 'provincia',
        description: 'Ingresar la provincia, se usara para el ingreso, debido a la base de datos Dexie.',
        type: String
    })
     @IsNumber()
     provinciaId: number;
     //----------------------------------------------------------------------
     @ApiProperty({
        name: 'ciudad',
        description: 'Ingresar la ciudad.',
        type: Pais
    })
     ciudad: Ciudad;

     @IsNumber()
     ciudadId: number;


    // @IsString()
    // @IsNotEmpty({
    //     message: 'El campo Pais no puede aparecer vacío.',
    //     context: {
    //         errorCode: 9012,
    //         developNote: errorCodeUser(9012)
    //     }
    // })
    // pais: string;
    // provincia: string,
    // ciudad: string,
  //  empresa: EmpresasInterface[],
  
}



/*
@IsOptional()	Checks if given value is empty (=== null, === undefined) and if so, ignores all the validators on the property.
@Equals(comparison: any)	Checks if value equals ("===") comparison.
@NotEquals(comparison: any)	Checks if value not equal ("!==") comparison.
@IsEmpty()	Checks if given value is empty (=== '', === null, === undefined).
@IsNotEmpty()	Checks if given value is not empty (!== '', !== null, !== undefined).
@IsIn(values: any[])	Checks if value is in a array of allowed values.
@IsNotIn(values: any[])	Checks if value is not in a array of disallowed values.
Type validation decorators	
@IsBoolean()	Checks if a value is a boolean.
@IsDate()	Checks if the value is a date.
@IsString()	Checks if the string is a string.
@IsNumber(options: IsNumberOptions)	Checks if the value is a number.
@IsInt()	Checks if the value is an integer number.
@IsArray()	Checks if the value is an array
@IsEnum(entity: object)	Checks if the value is an valid enum
Number validation decorators	
@IsDivisibleBy(num: number)	Checks if the value is a number that's divisible by another.
@IsPositive()	Checks if the value is a positive number greater than zero.
@IsNegative()	Checks if the value is a negative number smaller than zero.
@Min(min: number)	Checks if the given number is greater than or equal to given number.
@Max(max: number)	Checks if the given number is less than or equal to given number.
Date validation decorators	
@MinDate(date: Date)	Checks if the value is a date that's after the specified date.
@MaxDate(date: Date)	Checks if the value is a date that's before the specified date.
String-type validation decorators	
@IsBooleanString()	Checks if a string is a boolean (e.g. is "true" or "false").
@IsDateString()	Alias for @IsISO8601().
@IsNumberString(options?: IsNumericOptions)	Checks if a string is a number.
String validation decorators	
@Contains(seed: string)	Checks if the string contains the seed.
@NotContains(seed: string)	Checks if the string not contains the seed.
@IsAlpha()	Checks if the string contains only letters (a-zA-Z).
@IsAlphanumeric()	Checks if the string contains only letters and numbers.
@IsDecimal(options?: IsDecimalOptions)	Checks if the string is a valid decimal value. Default IsDecimalOptions are force_decimal=False, decimal_digits: '1,', locale: 'en-US'
@IsAscii()	Checks if the string contains ASCII chars only.
@IsBase32()	Checks if a string is base32 encoded.
@IsBase64()	Checks if a string is base64 encoded.
@IsIBAN()	Checks if a string is a IBAN (International Bank Account Number).
@IsBIC()	Checks if a string is a BIC (Bank Identification Code) or SWIFT code.
@IsByteLength(min: number, max?: number)	Checks if the string's length (in bytes) falls in a range.
@IsCreditCard()	Checks if the string is a credit card.
@IsCurrency(options?: IsCurrencyOptions)	Checks if the string is a valid currency amount.
@IsEthereumAddress()	Checks if the string is an Ethereum address using basic regex. Does not validate address checksums.
@IsBtcAddress()	Checks if the string is a valid BTC address.
@IsDataURI()	Checks if the string is a data uri format.
@IsEmail(options?: IsEmailOptions)	Checks if the string is an email.
@IsFQDN(options?: IsFQDNOptions)	Checks if the string is a fully qualified domain name (e.g. domain.com).
@IsFullWidth()	Checks if the string contains any full-width chars.
@IsHalfWidth()	Checks if the string contains any half-width chars.
@IsVariableWidth()	Checks if the string contains a mixture of full and half-width chars.
@IsHexColor()	Checks if the string is a hexadecimal color.
@IsHSLColor()	Checks if the string is an HSL color based on CSS Colors Level 4 specification.
@IsRgbColor(options?: IsRgbOptions)	Checks if the string is a rgb or rgba color.
@IsIdentityCard(locale?: string)	Checks if the string is a valid identity card code.
@IsPassportNumber(countryCode?: string)	Checks if the string is a valid passport number relative to a specific country code.
@IsPostalCode(locale?: string)	Checks if the string is a postal code.
@IsHexadecimal()	Checks if the string is a hexadecimal number.
@IsOctal()	Checks if the string is a octal number.
@IsMACAddress(options?: IsMACAddressOptions)	Checks if the string is a MAC Address.
@IsIP(version?: "4"|"6")	Checks if the string is an IP (version 4 or 6).
@IsPort()	Checks if the string is a valid port number.
@IsISBN(version?: "10"|"13")	Checks if the string is an ISBN (version 10 or 13).
@IsEAN()	Checks if the string is an if the string is an EAN (European Article Number).
@IsISIN()	Checks if the string is an ISIN (stock/security identifier).
@IsISO8601(options?: IsISO8601Options)	Checks if the string is a valid ISO 8601 date format. Use the option strict = true for additional checks for a valid date.
@IsJSON()	Checks if the string is valid JSON.
@IsJWT()	Checks if the string is valid JWT.
@IsObject()	Checks if the object is valid Object (null, functions, arrays will return false).
@IsNotEmptyObject()	Checks if the object is not empty.
@IsLowercase()	Checks if the string is lowercase.
@IsLatLong()	Checks if the string is a valid latitude-longitude coordinate in the format lat, long.
@IsLatitude()	Checks if the string or number is a valid latitude coordinate.
@IsLongitude()	Checks if the string or number is a valid longitude coordinate.
@IsMobilePhone(locale: string)	Checks if the string is a mobile phone number.
@IsISO31661Alpha2()	Checks if the string is a valid ISO 3166-1 alpha-2 officially assigned country code.
@IsISO31661Alpha3()	Checks if the string is a valid ISO 3166-1 alpha-3 officially assigned country code.
@IsLocale()	Checks if the string is a locale.
@IsPhoneNumber(region: string)	Checks if the string is a valid phone numberusing libphonenumber-js.
@IsMongoId()	Checks if the string is a valid hex-encoded representation of a MongoDB ObjectId.
@IsMultibyte()	Checks if the string contains one or more multibyte chars.
@IsNumberString(options?: IsNumericOptions)	Checks if the string is numeric.
@IsSurrogatePair()	Checks if the string contains any surrogate pairs chars.
@IsUrl(options?: IsURLOptions)	Checks if the string is an url.
@IsMagnetURI()	Checks if the string is a magnet uri format.
@IsUUID(version?: "3"|"4"|"5"|"all")	Checks if the string is a UUID (version 3, 4, 5 or all ).
@IsFirebasePushId()	Checks if the string is a Firebase Push ID
@IsUppercase()	Checks if the string is uppercase.
@Length(min: number, max?: number)	Checks if the string's length falls in a range.
@MinLength(min: number)	Checks if the string's length is not less than given number.
@MaxLength(max: number)	Checks if the string's length is not more than given number.
@Matches(pattern: RegExp, modifiers?: string)	Checks if string matches the pattern. Either matches('foo', /foo/i) or matches('foo', 'foo', 'i').
@IsMilitaryTime()	Checks if the string is a valid representation of military time in the format HH:MM.
@IsHash(algorithm: string)	Checks if the string is a hash The following types are supported:md4, md5, sha1, sha256, sha384, sha512, ripemd128, ripemd160, tiger128, tiger160, tiger192, crc32, crc32b.
@IsMimeType()	Checks if the string matches to a valid MIME type format
@IsSemVer()	Checks if the string is a Semantic Versioning Specification (SemVer).
@IsISSN(options?: IsISSNOptions)	Checks if the string is a ISSN.
@IsISRC()	Checks if the string is a ISRC.
@IsRFC3339()	Checks if the string is a valid RFC 3339 date.
Array validation decorators	
@ArrayContains(values: any[])	Checks if array contains all values from the given array of values.
@ArrayNotContains(values: any[])	Checks if array does not contain any of the given values.
@ArrayNotEmpty()	Checks if given array is not empty.
@ArrayMinSize(min: number)	Checks if the array's length is greater than or equal to the specified number.
@ArrayMaxSize(max: number)	Checks if the array's length is less or equal to the specified number.
@ArrayUnique(identifier?: (o) => any)
*/