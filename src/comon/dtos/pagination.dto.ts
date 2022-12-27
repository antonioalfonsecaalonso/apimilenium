/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Min(0)
    @Type( () => Number)
    limit?: number;
    
    @IsOptional()
    @Type( () => Number)
    offSet?: number;


}
