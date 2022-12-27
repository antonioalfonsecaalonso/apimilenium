/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Proveedor } from 'src/proveedores/entities/proveedor.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Ciudad } from '../pais-provincia-ciudad/ciudad/entities/ciudad.entity';
import { Pais } from '../pais-provincia-ciudad/pais/entities/pais.entity';
import { Provincia } from '../pais-provincia-ciudad/provincia/entities/provincia.entity';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { Direccion } from './entities/direccion.entity';
import { PaisService } from '../pais-provincia-ciudad/pais/pais.service';
import { ProvinciaService } from '../pais-provincia-ciudad/provincia/provincia.service';
import { Dir } from 'fs';
import { PaginationDto } from 'src/comon/dtos/pagination.dto';
import { array } from 'joi';

@Injectable()
export class DireccionService {
 
  
  constructor(
    @InjectRepository(Direccion)
    private readonly direccionRepository: Repository<Direccion>,
    @InjectRepository(Pais)
    private readonly paisRepository: Repository<Pais>,
    @InjectRepository(Provincia)
    private readonly provinciaRepository: Repository<Provincia>,
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly paisService: PaisService,
    private readonly provinciaService: ProvinciaService
  ) {}
  
  //---------------------------------------------------------------------------------------------------------------
  public createOne = async ( createDireccionDto: CreateDireccionDto) => 
  {
    try {
      
      if(isUUID(createDireccionDto.usuario)){
        createDireccionDto.usuario = await this.createUserBiUUID(createDireccionDto);
      }else{
        createDireccionDto.usuario = await this.createUser(createDireccionDto);
      }
      // tratamiento de paises
      try {
        if( (typeof createDireccionDto.pais) === 'number' ){
          createDireccionDto.pais = await this.createCountryById(createDireccionDto)
        }else{
          createDireccionDto.pais = await this.createCountry(createDireccionDto);
        }
        // tratamiento de provincias
        try {
          
          if( (typeof createDireccionDto.provincia) === 'number'){
            createDireccionDto.provincia = await this.createProvinceById(createDireccionDto);
          }else {
            createDireccionDto.provincia = await this.createProvince(createDireccionDto);
          }
          // tratamiento de ciudades.
          try {
          
            if( (typeof createDireccionDto.ciudad) === 'number') {
              createDireccionDto.ciudad = await this.createCiudadById(createDireccionDto);
            }else{
              createDireccionDto.ciudad = await this.createCiudad(createDireccionDto);
            }

            // tratamiento de calle y numero.
            if(!createDireccionDto.calle || !createDireccionDto.numero){
              return new BadRequestException("No se ha proporcionado ningúna calle y número, o no ha ingresado una calle y número válidos.").getResponse();
            }
        
            // salvando direccion;
            try{
              const direCreates = this.direccionRepository.create(createDireccionDto);
              const resultado   = await this.direccionRepository.save(direCreates);
              return resultado;
        
            } catch (error) {
              return new InternalServerErrorException("Existe algún tipo de problema en la creción de la dirección actual.").getResponse();
            } 

          } catch (error) {
            return new BadRequestException("No se ha proporcionado ningúna Ciudad, o no ha ingresado una Ciudad válida.").getResponse();
          }
        } catch (error) {  
          return new BadRequestException("No se ha proporcionado ningúna Provincia, o no ha ingresado una Provincia válida.").getResponse();
        }
      } catch (error) {
        return new BadRequestException("No se ha proporcionado ningún país, o no ha ingresado un país válido.").getResponse();
      }
    } catch (error) {
      return new BadRequestException("No se ha proporcionado ningún Usuario, o no ha existe ese usuario.").getResponse();
    }
  }
  //---------------------------------------------------------------------------------------------------------------
  async createCiudadById(createDireccionDto: CreateDireccionDto): Promise<any> {
    const {provincia, ciudad, ...rest} = createDireccionDto;

    if((typeof ciudad) !== 'number'){
      throw new InternalServerErrorException("Existe un problema en la recepcion de la ciudad.");
    }

    const ciudadId = parseInt(ciudad.toString());

    const ciudadBBDD = await this.ciudadRepository.findOne(
      { 
      where: { 
        id : ciudadId
      },
      relations: {
        provincia : true
      },
      }
    );
  
    if(!ciudadBBDD){
      throw new NotFoundException('La ciudad soliciatada no existe.').getResponse();
    }

    const provinciaAux = provincia as Provincia;

    if(ciudadBBDD.provincia.id !== provinciaAux.id) {
      throw new NotFoundException('Ha intentado ingresar una ciudad que no corresponde a esa provincia.').getResponse();
    }else{
      return this.ciudadRepository.create(ciudadBBDD);
    }
    
  }

  //---------------------------------------------------------------------------------------------------------------
  async createCiudad(createDireccionDto: CreateDireccionDto): Promise<any> {
    const {provincia, ciudad, ...rest} = createDireccionDto;
    
    if((typeof ciudad) === 'number'){
      throw new InternalServerErrorException("Existe un problema en la recepcion de la ciudad.");
    }
    
    const ciudadAux = ciudad as Ciudad;
    
    const ciudadBBDD = await this.ciudadRepository.findOne(
      { 
        where: { 
          id : ciudadAux.id
        },
        relations: {
          provincia : true
        },
      }
      );
      
      if(!ciudadBBDD){
        throw new NotFoundException('La ciudad soliciatada no existe.').getResponse();
      }
      
      const ciudadCreated = this.ciudadRepository.create(ciudadBBDD);
      const provinciaAux = provincia as Provincia;
      
      if(ciudadBBDD.provincia.id !== provinciaAux.id) {
        throw new NotFoundException('Ha intentado ingresar una ciudad que no corresponde a esa provincia.').getResponse();
      }else{
      return ciudadCreated;
    }
    
  }
  
  //---------------------------------------------------------------------------------------------------------------
  async createCountryById(createDireccionDto: CreateDireccionDto): Promise<Pais> {
    
    const {pais,...rest} = createDireccionDto;
    
    
    if((typeof pais) !== 'number'){
      throw new InternalServerErrorException("Existe un problema en la recepcion del pais.");
    }
    else{
      const paisId = parseInt(pais.toString());
      
      const paisBBDD = await this.paisRepository.findOne(
        { where: { 
          id : (paisId) 
        }
      }
      );
      
      return this.paisRepository.create(paisBBDD);
    }
  }
  
  //---------------------------------------------------------------------------------------------------------------
  async createCountry(createDireccionDto: CreateDireccionDto): Promise<Pais> {
    
    const {pais,...rest} = createDireccionDto;
    
    
    if((typeof pais) === 'number'){
      throw new InternalServerErrorException("Existe un problema en la recepcion del pais.");
    }
    else{
      const paisAux = pais as Pais;
      const paisBBDD = await this.paisRepository.findOne(
        { where: { 
          id : (paisAux.id) 
        }
      }
      );
      return this.paisRepository.create(paisBBDD);
    }
  }

  //---------------------------------------------------------------------------------------------------------------
  async createProvinceById(createDireccionDto: CreateDireccionDto):  Promise<Provincia> {
    
    const {provincia, pais, ...rest} = createDireccionDto;
    
    if((typeof provincia) !== 'number'){
      throw new InternalServerErrorException("Existe un problema en la recepcion de la ciudad.");
    }
    
    
    const provinciaId = parseInt(provincia.toString());
    
    const provinciaBBDD = await this.provinciaRepository.findOne(
      { 
        where: { 
          id : provinciaId
        },
        relations: {
          pais : true
        },
      }
    );

    if(!provinciaBBDD){
      throw new NotFoundException('La provincia soliciatada no existe.').getResponse();
    }
    
    const provinciaCreated = this.provinciaRepository.create(provinciaBBDD);
    const paisAux = pais as Pais;
    
    if(provinciaBBDD.pais.id !== paisAux.id) {
      throw new NotFoundException('Ha intentado ingresar una provinca que no corresponde a ese País.').getResponse();
    }
    else{
      return provinciaCreated;
    }
    
  }
  
  //---------------------------------------------------------------------------------------------------------------
  async createProvince(createDireccionDto: CreateDireccionDto):  Promise<Provincia> {
    
    const {provincia, pais, ...rest} = createDireccionDto;
    
    if((typeof provincia) === 'number'){
      throw new InternalServerErrorException("Existe un problema en la recepcion de la ciudad.");
    }
    
    
    const provinciaAux = provincia as Provincia;
    
    const provinciaBBDD = await this.provinciaRepository.findOne(
      { 
        where: { 
          id : provinciaAux.id
        },
        relations: {
          pais : true
        },
      }
      );
      
      if(!provinciaBBDD){
        throw new NotFoundException('La provincia soliciatada no existe.').getResponse();
      }
      
      const paisAux = pais as Pais;
      
      if(provinciaBBDD.pais.id !== paisAux.id) {
        throw new NotFoundException('Ha intentado ingresar una provinca que no corresponde a ese País.').getResponse();
      }
      else{
        return this.provinciaRepository.create(provinciaBBDD);
      }
      
    }
    
  //---------------------------------------------------------------------------------------------------------------
  async createUserBiUUID(createDireccionDto: CreateDireccionDto | string): Promise<User>{
      
      let userAux: string = '';

      if(typeof(createDireccionDto) !== 'string'){

        const {usuario,...rest} = createDireccionDto;
        userAux = usuario.id;
      }else{

        userAux = createDireccionDto;
      }
      
      const uuid = userAux;
      
      const usuarioBBDD = await this.userRepository.findOne({
        where: {
          id : uuid,
        },
      });
      
      if (!usuarioBBDD){
        throw new NotFoundException("El usuariono existe en la base de datos.");
      }
      

    return this.userRepository.create(usuarioBBDD);
  }
  //---------------------------------------------------------------------------------------------------------------
  public createUser = (createDireccionDto: CreateDireccionDto) => {
    
    const {usuario, ...rest} = createDireccionDto;
    const {id,...rest2} = usuario;
    
    return this.createUserBiUUID(id);
  }
  //---------------------------------------------------------------------------------------------------------------

  // public updateProveedor = async (idDireccion: number, idProveedor: number) => {
  //   throw new Error('Method not implemented.');
  // }
  updateProveedor = async (direccion: Direccion, update: Proveedor) => {

    
    const dirUpdate = await this.direccionRepository.findOne({
      where : {
        id: direccion.id
      }
    })


    dirUpdate.proveedor = update;
    this.direccionRepository.create(dirUpdate);
    this.direccionRepository.save(dirUpdate);
    try{

    }catch(Exception){
      return new BadRequestException("No se ha podido actualizar el proveedor en la direccion, P201");
    }
    return await this.direccionRepository.save(direccion);

  }
  //-------------------------------------------------------------------------------------------------------------
  obtenerTotalDirecciones = async (): Promise<number | NotFoundException> => {
    
    try {
      const numeroDirecciones = await this.direccionRepository.count();
      return numeroDirecciones;
    } catch (error) {
      return new NotFoundException("Error en el conteo de Familias, P900.");
    }
  }
  //-------------------------------------------------------------------------------------------------------------
  findEachoFifteenProveedor = async(paginationDto: PaginationDto) => {

    const { 
      limit, 
      offSet 
    } = paginationDto;

    try {

      const familia = await this.direccionRepository.find({ 
        take: limit,
        skip: offSet,
        relations: {
          pais: true,
          provincia: true,
          ciudad: true,
          proveedor: true,
          usuario: true,
        }
      });

      const arrayDirecciones: Direccion[] = [];

      familia.forEach(element => {

// *
        let paisOut: number;
        
        if(!element.pais){
          paisOut = 1000000;
        }else{
        
          if(typeof(element.pais) === 'object'){
        
            paisOut = element.pais.id;
          }else{
            paisOut = element.pais;
          }
        }
// *
// *
        let provinciaOut: number;
        
        if(!element.provincia){
          provinciaOut = 1000000;
        }else{
        
          if(typeof(element.provincia) === 'object'){
        
            provinciaOut = element.provincia.id;
          }else{
            provinciaOut = element.provincia;
          }
        }
// *
// *
        let ciudadOut: number;
        
        if(!element.ciudad){
          ciudadOut = 1000000;
        }else{
        
          if(typeof(element.ciudad) === 'object'){
        
            ciudadOut = element.ciudad.id;
          }else{
            ciudadOut = element.ciudad;
          }
        }
// *
// *
        let usuarioOut: string;
        
        if(!element.proveedor){
          usuarioOut = '';
        }else{
        
          if(typeof(element.proveedor) === 'object'){
        
            usuarioOut = element.proveedor.id;
          }else{
            usuarioOut = element.proveedor;
          }
        }
// 
        const dirAux: any = {
          id: element.id,
          calle: element.calle,
          tipo: element.tipo,
          codigoPostal: element.codigoPostal,
          pais: paisOut,
          provincia: provinciaOut,
          ciudad: ciudadOut,
          usuario: usuarioOut
        }

        arrayDirecciones.push(dirAux);
      });


      return arrayDirecciones;
      // const direccion = {
      //   "id": familia.id,
      //   "calle": "VARIOS",
      //   "tipo": "principal",
      //   "codigoPostal": "12345",
      //   "pais": {
      //       "id": 207,
      //       "iso2": "ES",
      //       "iso3": "ESP",
      //       "name": "España"
      //   },
      //   "provincia": {
      //       "id": 1000000,
      //       "name": "UNKNOWN",
      //       "state_code": "UNKNOWN"
      //   },
      //   "ciudad": {
      //       "id": 1000000,
      //       "name": "UNKNOWN",
      //       "cp": null
      //   },
      //   "proveedor": {
      // }
      // return familia;
     
    } catch (error) {
      console.log(error, " errorCode: P902");
      return new InternalServerErrorException("Error en la conexión u obtención de Direcciones, P902");
    }  
  }
  
  

  //------------------- desde aqui en adelante para SAP -----------------
  public modificarCiudadesConAcento = (ciudad: string) => {


    if(ciudad === 'CADIZ'){
      return 'Cádiz';
    }
    else if(ciudad.includes('PRATO')){
      return 'Prato';
    }
        
    else if(ciudad.includes('LAS CABEZAS')){
      return 'Sevilla';
    }
        
    else if(ciudad.includes('MATARO')){
      return 'Mataró';
     }
        
    else if(ciudad.includes('CORDOBA') || ciudad === 'CORDOBA'){
      return 'Córdoba';
    }
        
    else if(ciudad.includes('ECIJA')){
      return 'Écija';
    }
    
    else if(ciudad.includes('FUENLABRA') || ciudad.includes('FUNENLABRADA')){
      return 'Fuenlabrada';
    }
    
    else if(ciudad.includes('ALCORCON')){
      return 'Madrid';
    }
    
    else if(ciudad.includes('PRONTO')){
      return 'PRONTO';
     }
    
    else if(ciudad.includes('CORIA DEL RIO') || ciudad.includes('ALCALA DE GUADAIRA')){
      return 'Sevilla';
    }

    else if(ciudad.includes('FUENLABRADA') || ciudad.includes('ALCALA DE GUADAIRA')){
      return 'Fuenlabrada';
    }

    else{
      return ciudad;
    } 

  }

  async agregarDireccionesSap2(direccion: Direccion):Promise<Direccion> {

  
    const paisIso2: string = direccion.pais.toString();
    // buscamos el pais por su iso2
    await this.paisService.findOneByIso2(paisIso2).then(async (pais: Pais) => {
      
      direccion.pais = pais;
      let provinciaAux = 'UNKNOWN';

      try {
        
        provinciaAux = direccion.provincia.toString();

      } catch (error) {
        provinciaAux = 'UNKNOWN';

        try {
          // buscaremos provincia por la ciudad
          const name = this.modificarCiudadesConAcento(direccion.ciudad.toString());
          try {

            let ciudad = await this.ciudadRepository.createQueryBuilder('ciudad')
            .leftJoinAndSelect("ciudad.provincia", "provincia")
            .where("LOWER(Ciudad.name) = LOWER(:name)", {name})
            .getOne();

            provinciaAux = ciudad.provincia.name;

          } catch (error) {}

        } catch (error) {}

      }
      
      let provincia = provinciaAux.toString();

      if(provincia === 'MADIRD'){
        provincia = 'Madrid';
      }

      await this.provinciaService.findOneByNameSap(provincia).then( async (provinciaFinded: Provincia) => {

        if(provinciaFinded === null){

          provinciaFinded = await this.provinciaRepository.findOne({
              where : {
                id : 1000000
              }
          })

        }
        direccion.provincia = provinciaFinded;
      });
     // definicion de las ciudades.
      let name = 'UNDEFINED';
      try {
        name = direccion.ciudad.toString();
      } catch (error) {
        name = 'UNDEFINED'
      }
      
      try {
        name = this.modificarCiudadesConAcento(name);
        let ciudad = await this.ciudadRepository.createQueryBuilder('ciudad')
        .leftJoinAndSelect("ciudad.provincia", "provincia")
        .where("LOWER(Ciudad.name) = LOWER(:name)", {name})
        .getOne();
        if(!ciudad){
          ciudad = await this.ciudadRepository.findOne({
            where: {
              id : 1000000
            }
          })
        }
        direccion.ciudad = ciudad;

        if(!direccion.calle) {
          direccion.calle = 'UNKNOWN';
        }
        return direccion;
      } catch (error) {
        if(error.code !== 23505){
          console.log("revisar direccion.service.ts linea 506")
        }
      }
    })

    return direccion;
  }

  public salvarDireccion = async (direccion: Direccion): Promise<Direccion> => {

    const direCreated = this.direccionRepository.create(direccion);
    return await this.direccionRepository.save(direccion);
    
  }
}
