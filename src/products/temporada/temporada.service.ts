/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTemporadaDto } from './dto/create-temporada.dto';
import { UpdateTemporadaDto } from './dto/update-temporada.dto';
import { Temporada } from './entities/temporada.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/comon/dtos/pagination.dto';

@Injectable()
export class TemporadaService {


  constructor(
    @InjectRepository(Temporada)
    private readonly temporadaRepository: Repository<Temporada>
  ) {

  }

  obtenerTotalTemporadas = async (): Promise<number | NotFoundException> => {

    try {
      const numeroTemporadas = await this.temporadaRepository.count();
      return numeroTemporadas;
    } catch (error) {
      return new NotFoundException("Error en el conteo de Temporadas.");
    }

  }

  findOneByName = async(temporada: string): Promise<Temporada> =>{
    const temp = this.temporadaRepository.findOne({where : {
      name : temporada
    }})

    return temp;
  }
  
  findEachoFifteen = async(paginationDto: PaginationDto) => {

    const { 
      limit, 
      offSet 
    } = paginationDto;

    try {

      const temporada = await this.temporadaRepository.find({ 
        take: limit,
        skip: offSet,
        relations: {
          updatedBy : true,
          createdBy : true
        }
      });

      return temporada;
     
    } catch (error) {
      console.log(error, " errorCode: P502");
      return new InternalServerErrorException("Error en la conexión u obtención de colores, P302");
    }  
  }
  
  // create(createTemporadaDto: CreateTemporadaDto) {
  //   return 'This action adds a new temporada';
  // }

  // findAll() {
  //   return `This action returns all temporada`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} temporada`;
  // }

  // update(id: number, updateTemporadaDto: UpdateTemporadaDto) {
  //   return `This action updates a #${id} temporada`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} temporada`;
  // }
}
