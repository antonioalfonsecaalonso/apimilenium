/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProvinciaInterface } from '../provincia/provincia.service';
import { PaginationDto } from 'src/comon/dtos/pagination.dto';
import { Provincia } from '../provincia/entities/provincia.entity';

@Injectable()
export class CiudadService {
 

  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>
  ){}
  
  async obtenerNumeroCiudades() {
    return await this.ciudadRepository.count();
  }

  async obtenerTodasLasCiudades(paginationDto: PaginationDto) {
    const { limit, offSet} = paginationDto;
    
    return await this.ciudadRepository.find({
      take: limit,
      skip: offSet,
      relations: {
        provincia : true
      },
     });
  }

  public obtenerCiudadPorName = async (name: string) => {
    
    const ciudad = await (this.ciudadRepository.createQueryBuilder("ciudad")
    .where("LOWER(ciudad.name) = LOWER(:name)", { name })
    .getOne());
    
   
    const provincia = await this.ciudadRepository.createQueryBuilder()
    .where("LOWER(Ciudad.name) = LOWER(:name)", {name})
    .relation(Ciudad, "provincia")
    .of(ciudad)
    .loadOne();
////
// if(!provincia) {
  
//   p
//   provincia = {Provincia :{
//     id: 1000000,
//     name: "undefined",
//     state_code: "undefined"
//   }}
// }
  return provincia;

   // console.log(provincia);
    
   
  }
 
 
}

export interface CiudadesInterface{
  id: any;
  name: string;
  provincia: ProvinciaInterface;
}