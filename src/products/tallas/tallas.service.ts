/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/comon/dtos/pagination.dto';
import { In, Repository } from 'typeorm';
import { Talla } from './entities/talla.entity';

@Injectable()
export class TallasService {
  
  constructor(
    @InjectRepository(Talla)
    private readonly tallasRepository: Repository<Talla>
  ){

  }

  obtenerVariasTallas = async (tallasIn : any[]): Promise<Talla[]> => {
    
    const tallas =await this.tallasRepository.find({ where: { id: In(tallasIn) } })
    return tallas;
  }
  
  findOneByName = async (tallaje: string) => {

    const tallas = await this.tallasRepository.findOne({where : {
      name : tallaje
    }});
    return tallas;
    
  }


  obtenerTotalTallas = async (): Promise<number | NotFoundException> => {

    try {
      const numeroTallas = await this.tallasRepository.count();
      return numeroTallas;
    } catch (error) {
      return new NotFoundException("Error en el conteo de Tallas.");
    }

  }

  findEachoFifteen = async(paginationDto: PaginationDto) => {

    const { 
      limit, 
      offSet 
    } = paginationDto;

    try {

      const tallas = await this.tallasRepository.find({ 
        take: limit,
        skip: offSet,
        relations: {
          updatedBy : true,
          createdBy : true
        }
      });

      return tallas;
     
    } catch (error) {
      console.log(error, " errorCode: P602");
      return new InternalServerErrorException("Error en la conexión u obtención de colores, P602");
    }  
  }

  // create(createTallaDto: CreateTallaDto) {
  //   return 'This action adds a new talla';
  // }

  // findAll() {
  //   return `This action returns all tallas`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} talla`;
  // }

  // update(id: number, updateTallaDto: UpdateTallaDto) {
  //   return `This action updates a #${id} talla`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} talla`;
  // }


}
