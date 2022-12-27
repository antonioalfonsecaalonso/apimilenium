/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grupo } from './entities/grupo.entity';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { PaginationDto } from 'src/comon/dtos/pagination.dto';


@Injectable()
export class GrupoService {

  constructor(
    @InjectRepository(Grupo)
    private readonly grupoRepository: Repository<Grupo>
  ) {}

  obtenerTotalGrupos = async (): Promise<number | NotFoundException> => {

    try {
      const numeroGrupos = await this.grupoRepository.count();
      return numeroGrupos;
    } catch (error) {
      return new NotFoundException("Error en el conteo de grupos, P700.");
    }
  }

  findEachoFifteen = async(paginationDto: PaginationDto) => {

    const { 
      limit, 
      offSet 
    } = paginationDto;

    try {

      const grupo = await this.grupoRepository.find({ 
        take: limit,
        skip: offSet,
        relations: {
          updatedBy : true,
          createdBy : true,
          tipo: true
        }
      });

      return grupo;
     
    } catch (error) {
      console.log(error, " errorCode: P702");
      return new InternalServerErrorException("Error en la conexión u obtención de colores, P702");
    }  
  }

  findOneByName = async (grupoIn: string) => {
    const grupoOut = await  this.grupoRepository.findOne({ where : {
      name : grupoIn
    }})

    return grupoOut;
  }
 
 


  //
  

  // create(createGrupoDto: CreateGrupoDto) {
  //   return 'This action adds a new grupo';
  // }

  // findAll() {
  //   return `This action returns all grupo`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} grupo`;
  // }

  // update(id: number, updateGrupoDto: UpdateGrupoDto) {
  //   return `This action updates a #${id} grupo`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} grupo`;
  // }
}
