/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tipo } from './entities/tipo.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/comon/dtos/pagination.dto';

@Injectable()
export class TipoService {

  constructor(
    @InjectRepository(Tipo)
    private readonly tiposRepository: Repository<Tipo>
  ){

  }

  obtenerTotalTipos = async (): Promise<number | NotFoundException> => {

    try {
      const numeroTipos = await this.tiposRepository.count();
      return numeroTipos;
    } catch (error) {
      return new NotFoundException("Error en el conteo de tipos. P400");
    }

  }

  findEachoFifteen = async(paginationDto: PaginationDto) => {

    const { 
      limit, 
      offSet 
    } = paginationDto;

    try {

      const tipos = await this.tiposRepository.find({ 
        take: limit,
        skip: offSet,
        relations: {
          createdBy: true,
          updatedBy: true
        }
      });

      return tipos;
     
    } catch (error) {
      console.log(error);
      return new InternalServerErrorException("Error en la conexión u obtención de tipos, P402");
    }  
  }
  // create(createTipoDto: CreateTipoDto) {
  //   return 'This action adds a new tipo';
  // }

  // findAll() {
  //   return `This action returns all tipo`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} tipo`;
  // }

  // update(id: number, updateTipoDto: UpdateTipoDto) {
  //   return `This action updates a #${id} tipo`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} tipo`;
  // }
}
