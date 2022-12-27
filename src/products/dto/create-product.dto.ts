/* eslint-disable prettier/prettier */
import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateProductDto {

    @IsString()
    @MinLength(1)
    title: string;

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsString()
    @IsOptional()
    slug?: string;

    @IsInt()
    @IsOptional()
    stock?: number;

    @IsString({ each: true})
    @IsArray()
    @IsOptional()
    tallas?: [];

    @IsIn(['men', 'women', 'boy', 'girl', 'unisex'])
    gender: string;

}
