/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, NotFoundException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/comon/dtos/pagination.dto';
import { obtenerError } from 'src/errors/errors';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Pais } from '../core/pais-provincia-ciudad/pais/entities/pais.entity';
import { Provincia } from 'src/core/pais-provincia-ciudad/provincia/entities/provincia.entity';
import { Ciudad } from '../core/pais-provincia-ciudad/ciudad/entities/ciudad.entity';

;@Injectable()
export class UserService {


  async countUsers() {
    return await this.userRepository.count();  
  }


  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Pais)
    private readonly paisRepository: Repository<Pais>,
    @InjectRepository(Provincia)
    private readonly provinciaRepository: Repository<Provincia>,
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>
  ) {}

 
  async create(createUserDto: CreateUserDto): Promise<User | NotFoundException | void | Object>{
    
      //---- Paises
    try {
 
      const pais = await this.paisRepository.findOne(
        { where: { 
            id : createUserDto.paisId 
          }
        }
      );
      const paisCreated = this.paisRepository.create(pais);
      createUserDto.pais = paisCreated;
      //---- provincias
      const provincia = await this.provinciaRepository.findOne(
        { 
        where: { 
          id : createUserDto.provinciaId 
        },
        relations: {
          pais : true
        },
        }
      );

      if(provincia.pais.id !== paisCreated.id){
        return new NotFoundException('Ha intentado ingresar una provincia que no corresponde a ese país.').getResponse();
      }

      const provinciaCreated = this.provinciaRepository.create(provincia);
      createUserDto.provincia = provinciaCreated;

      // ----- Ciudad--------------------------------------------
      const ciudad = await this.ciudadRepository.findOne(
        { 
        where: { 
          id : createUserDto.ciudadId 
        },
        relations: {
          provincia : true
        },
        }
      );

 
      if(ciudad.provincia.id !== provinciaCreated.id){
        return new NotFoundException('Ha intentado ingresar una ciudad que no corresponde a esa provincia.').getResponse();
      }

      const ciudadCreates = this.ciudadRepository.create(ciudad);
      createUserDto.ciudad = ciudadCreates;
      // -----



      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
      const { password, ...result } = user;
      
      return result;

    } catch (error) {
      return obtenerError('UserService', error, '');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offSet} = paginationDto;
    return await this.userRepository.find({ 
      take: limit,
      skip: offSet,
      relations: {
        provincia : true,
        pais: true,
        ciudad: true
      },
      });
  }

  async findAllForInstall(paginationDto: PaginationDto) {
    return this.userRepository.find();
  }

  async findOne(term: {login: string, password: string}) {

    let user: User;

    if( (isUUID(term))){
      user = await this.userRepository.findOneBy({ id: term.login });
      if(!user){
        return obtenerError('UserService', null,'notFound');
      }
    }else{

      const queryBuilder = this.userRepository.createQueryBuilder("user");

      user = await queryBuilder
      .leftJoinAndSelect("user.pais", "pais")
      .leftJoinAndSelect("user.provincia","provincia")
      .leftJoinAndSelect("user.ciudad","ciudad")
      .where(
        '(LOWER(usuario) =:usuario or LOWER(email) =:email)', {
          usuario: term,
          email: term.login.toLowerCase(),
        })
      .getOne();

      if(!user){
        return obtenerError('UserService', null,'notFound');
      }
    }
    delete(user.password);
    return user;
  }

  async findOneById(id: string) {

    let user: User;

    if( (isUUID(id))){
      user = await this.userRepository.findOneBy({id});
      if(!user){
        return obtenerError('UserService', null,'notFound', 'usuario');
      }
    }else{

      const queryBuilder = this.userRepository.createQueryBuilder();

      user = await queryBuilder
      .where('(id =: id)', { id: id })
      .getOne();

      if(!user){
        return obtenerError('UserService', null,'notFound', 'usuario');
      }
    }
    delete(user.password);
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  public findOneByEmail = async (term: string, allowPass?: boolean): Promise<User> => {

    let user: User;
    const queryBuilder = this.userRepository.createQueryBuilder("user");
    

    user = await queryBuilder
    .leftJoinAndSelect("user.pais", "pais")
    .leftJoinAndSelect("user.provincia","provincia")
    .leftJoinAndSelect("user.ciudad","ciudad")
    .where(
      '(LOWER(usuario) =:usuario or LOWER(email) =:email)', {
        usuario: term,
        email: term.toLowerCase(),
      })
      .getOne();
      
      if(!user){
        throw new NotFoundException("El usuario ingresado no existe en nuestra base de datos.");
      }
   

    //  user.password = "offline";
    
      if(allowPass === false){
        delete(user.password);
      }
    return user;
  }


  async editOne(id: string, updateUserDto: UpdateUserDto, userEntity?: User): Promise<UpdateResult> {
    
    const user = await this.findOneById(id).then(u => {

      if(!userEntity || (id === userEntity.id) ){
        return user;
      }else{
        return null;
      }

    });


    if(user){

      //const editedUser = Object.assign(user, updateUserDto);
      return await this.userRepository.update(user.id, updateUserDto);
      
    }else{
      throw new UnauthorizedException("Usted no tiene permisos para realizar esta acción.");
    }

  }

  update(arg0: number, updateUserDto: UpdateUserDto) {
    throw new Error('Method not implemented.');
  }
  
}
