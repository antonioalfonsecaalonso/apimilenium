/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Provincia } from './entities/provincia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaisInterface } from '../pais/pais.service';
import { PaginationDto } from 'src/comon/dtos/pagination.dto';
import { CiudadService } from '../ciudad/ciudad.service';

@Injectable()
export class ProvinciaService {

  constructor(
    @InjectRepository(Provincia)
    public readonly provinciaRepository: Repository<Provincia>,

    private readonly ciudadService: CiudadService
  ){}



  async findAll(paginationDto: PaginationDto) {
    const { limit, offSet} = paginationDto;
    
    return await this.provinciaRepository.find({
      take: limit,
      skip: offSet,
      relations: {
        pais : true
      },
     });
  }

  async findOneByNameSap(name: string) {

    

 
    
    return await (this.provinciaRepository.createQueryBuilder("provincia")
    .where("LOWER(provincia.name) = LOWER(:name)", { name })
    .getOne())

   
    //console.log("buscar: ", name, " encontrado: ", provincia);
    // if (!provincia) {
    //   provincia = await this.ciudadService.obtenerCiudadPorName(name);
    //   if(!provincia){
    //     provincia = await this.provinciaRepository.findOne({
    //       where: {
    //         id : 1000000
    //       }
    //     })
    //   }
    // }
  
    //.then((x: any ) => {
    //  if(!x){
       //
    //  }
   // });

  }


  obtenerTotalProvincias = () => {
    return this.provinciaRepository.count();
  }

  findOne(id: number) {
    return `This action returns a #${id} provincia`;
  }

 

}


export interface ProvinciaInterface {
  id : number,
  pais: PaisInterface,
  name : string,
  state_code?: string,
}
