/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pais } from './entities/pais.entity';
import { Repository } from 'typeorm';
import { ProvinciaService } from '../provincia/provincia.service';
import { PaginationDto } from 'src/comon/dtos/pagination.dto';


@Injectable()
export class PaisService {

  
 
  constructor(
    @InjectRepository(Pais)
    public readonly paisRepository: Repository<Pais>,
    public readonly provinciaService: ProvinciaService,
  ) {}

  
  findAll(paginationDto: PaginationDto) {
    const { limit, offSet} = paginationDto;
    
    return this.paisRepository.find({
      take: limit,
      skip: offSet
    });
  }

  totalPaises() {
    return this.paisRepository.count();
  }


  async findOneByIso2(paisIso2: string): Promise<Pais> {
    try{
      const aux = await this.paisRepository.findOne(
      { 
        where: { 
          iso2 : paisIso2
        }
      });
      return aux;
    }catch(error){
      throw new InternalServerErrorException("Error en la búsqueda del pais");
    }

  }

}


export interface PaisInterface {
  id : number;
  iso2: string;
  iso3: string;
  name: string;
  translations? : string | undefined;
}