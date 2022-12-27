/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './entities/color.entity';
import { In, Repository } from 'typeorm';
import { PaginationDto } from 'src/comon/dtos/pagination.dto';

@Injectable()
export class ColorService {




  findOneByName = async(colorName: string[]) => {
    const colores = await this.colorRepository.find({ where: { color: In(colorName) } })
    return colores;
  }
 
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>
  ){
  }

  create(createColorDto: CreateColorDto) {
    return 'This action adds a new color';
  }

  findAll() {
    try{
      const colores = this.colorRepository.find();
      return colores;
    }catch ( error ) {
      return new InternalServerErrorException('Existe algún tipo de error en la búsqueda de todos los colore.');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} color`;
  }

  findEachoFifteen = async(paginationDto: PaginationDto) => {

    const { 
      limit, 
      offSet 
    } = paginationDto;

    try {

      const colores = await this.colorRepository.find({ 
        take: limit,
        skip: offSet,
        relations: {
          updatedBy : true,
          createdBy : true
        }
      });

      return colores;
     
    } catch (error) {
      console.log(error);
      return new InternalServerErrorException("Error en la conexión u obtención de colores, P302");
    }  
  }
  


  obtenerTotalColores = async (): Promise<number | NotFoundException> => {

    try {
      const numeroColores = await this.colorRepository.count();
      return numeroColores;
    } catch (error) {
      return new NotFoundException("Error en el conteo de colores.");
    }

  }

  obtenerColoresPorId = async (coloresIn: string[]): Promise<Color[]> => {
    const colores = await this.colorRepository.find({ where: { id: In(coloresIn) } })
    return colores;
  }

  update(id: number, updateColorDto: UpdateColorDto) {
    return `This action updates a #${id} color`;
  }

  remove(id: number) {
    return `This action removes a #${id} color`;
  }

    // ------- datos insertados dedes sap;
  insertarDesdeSap = async (colorIn: Color) => {

    
      const {color,...rest} = colorIn;
  
      try {
        // const articuloExistente = await this.tallasRepository.findOne({
        //   where: {
        //     name : name,
        //     tallaDesc: tallaDesc
        //   }
        // })
  
       // if(!articuloExistente){
  
          const colorCreado = this.colorRepository.create(colorIn);
          const color = await this.colorRepository.save(colorCreado);
          console.log("Se ha creado ", color);
        //}
        
      } catch (error) {
       
        if (error.code === 23505 || error.code === '23505'){
        }else {
          console.log(error.code);
        }
      }
  
    }
}
