/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/comon/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { Familia } from './entities/familia.entity';

@Injectable()
export class FamiliaService {

  constructor(
    @InjectRepository(Familia)
    private readonly familiaRepository: Repository<Familia>
  ){   
  }
  
  obtenerTotalFamilias = async (): Promise<number | NotFoundException> => {

    try {
      const numeroFamilias = await this.familiaRepository.count();
      return numeroFamilias;
    } catch (error) {
      return new NotFoundException("Error en el conteo de Familias, P800.");
    }
  }

  findEachoFifteen = async(paginationDto: PaginationDto) => {

    const { 
      limit, 
      offSet 
    } = paginationDto;

    try {

      const familia = await this.familiaRepository.find({ 
        take: limit,
        skip: offSet,
        relations: {
          grupo : true
        }
      });

      return familia;
     
    } catch (error) {
      console.log(error, " errorCode: P802");
      return new InternalServerErrorException("Error en la conexión u obtención de colores, P802");
    }  
  }

  findOneByName = async(familiaName: string) => {
    const familia = await this.familiaRepository.findOne({ where : { name : familiaName}});
    return familia.id;
  }
  // create(createFamiliaDto: CreateFamiliaDto) {
  //   return 'This action adds a new familia';
  // }

  // findAll() {
  //   return `This action returns all familia`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} familia`;
  // }

  // update(id: number, updateFamiliaDto: UpdateFamiliaDto) {
  //   return `This action updates a #${id} familia`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} familia`;
  // }
}
