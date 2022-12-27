/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotAcceptableException, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { Proveedor } from './entities/proveedor.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Direccion } from 'src/core/direccion/entities/direccion.entity';
import { CreateDireccionDto } from '../core/direccion/dto/create-direccion.dto';
import { DireccionService } from '../core/direccion/direccion.service';
import { PaginationDto } from 'src/comon/dtos/pagination.dto';
import { Ciudad } from '../core/pais-provincia-ciudad/ciudad/entities/ciudad.entity';

@Injectable()
export class ProveedorService {

  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
    private readonly userService: UserService,
    private readonly direccionService: DireccionService,
  ){}
  
  async create(createProveedorDto: CreateProveedorDto) {
    
    // manejo del usuario
    let uuid = '';

    // Si el formato viene en uuid buscamos el usuario, si viene en objeto, extraemos el uuid.
    if( (typeof createProveedorDto.administrador) === 'string'){
      uuid = createProveedorDto.administrador as unknown as string;
    }else{
      const userAux: User = createProveedorDto.administrador as unknown as User;
      uuid = userAux.id;
    }
    createProveedorDto.administrador = await this.userService.findOneById(uuid);

    if(!createProveedorDto.administrador){
      throw new NotFoundException();
    }

    try {

      const proveedor = this.proveedorRepository.create(createProveedorDto);
      const saved = await this.proveedorRepository.save(proveedor);

       // manejo de la direccion principal
       
       const direccionPrincipal: any = await this.comprobarDireccionCompleta(createProveedorDto.direccion, createProveedorDto.administrador as User, proveedor );

       if(!direccionPrincipal.id){
         return new BadRequestException(direccionPrincipal.message).getResponse();
       }
 
      createProveedorDto.direccion = direccionPrincipal;
 
      // manejo de la direccion secundaria

      return saved;
    } catch (error) {
      if(error.response){
        return error.response;
      }
      if(error.code === '23505') {

        let texto = '';

        if(error.detail.includes('denominacion')){
          texto = "La denominacion";
        }
        else if(error.detail.includes('codigo')){
          texto = "El codigo";
        }
        else if(error.detail.includes('telefono1')){
          texto = "El telefono1";
        }
        else if(error.detail.includes('nif')){
          texto = "El nif";
        }

        throw new NotAcceptableException(`${texto} ya existe en nuestra base de datos`);
      }
      else{
        return new InternalServerErrorException("Existe algún tipo de problema, si el error persiste, pongaseen contacto con el administrador, P200")
      }


    }

  }

  // con esta función ingresaremos una nueva direccion, y obtendremos la id que nos ha proporcionado, para despues
  // poder modificar lal direccion asignandole el id del proveedor.
  public comprobarDireccionCompleta = async (direccion: Direccion , usuario: User, proveedor: Proveedor) => {
    const direccionDto        = new CreateDireccionDto();
    direccionDto.usuario      = usuario;
    direccionDto.calle        = direccion.calle;
    direccionDto.ciudad       = direccion.ciudad;
    direccionDto.pais         = direccion.pais;
    direccionDto.codigoPostal = direccion.codigoPostal;
    direccionDto.proveedor    = proveedor;
    direccionDto.provincia    = direccion.provincia;
    try {
      const resultado: any = await this.direccionService.createOne(direccionDto);
      return resultado;
    } catch (error) {
    //  return InternalServerErrorException("Existe algún tipo de error en la petición, ")
    }
  }



  findEachoFifteen = async(paginationDto: PaginationDto) => {

    const { 
      limit, 
      offSet 
    } = paginationDto;

    return await this.proveedorRepository.find({ 
      take: limit,
      skip: offSet,
      relations: {
        administrador : true
      }
    });
    
  }

  findAll = async(): Promise<Proveedor[] | InternalServerErrorException> => {
    
    try {
      
      const proveedores = await this.proveedorRepository.find();
      return proveedores;
    } catch (error) {

      return new InternalServerErrorException("Error en la busqueda de los proveedores, P203")
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} empresa`;
  }

  async findOneByName(name: string): Promise<Proveedor> {
    const proveedor = await this.proveedorRepository.findOne({ where : { denominacion : name}});
    return proveedor;
  }

  update(id: number, updateProveedorDto: UpdateProveedorDto) {
    return `This action updates a #${id} empresa`;
  }

  obtenerNumeroProveedores = async (): Promise<number | NotFoundException> => {

    try {
      const numeroProveedores = await this.proveedorRepository.count();
      return numeroProveedores;
    } catch (error) {
      return new NotFoundException("Error en el conteo de proveedores.");
    }

  }

  remove(id: number) {
    return `This action removes a #${id} empresa`;
  }

}

