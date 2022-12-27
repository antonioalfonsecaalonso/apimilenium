/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Instalaciones } from './entities/instalaciones.entity';
import { Repository } from 'typeorm';
import { Pais } from '../pais-provincia-ciudad/pais/entities/pais.entity';
import { join } from 'path';
import { PaisInterface } from '../pais-provincia-ciudad/pais/pais.service';
import { ProvinciaInterface } from '../pais-provincia-ciudad/provincia/provincia.service';
import { CiudadesInterface } from '../pais-provincia-ciudad/ciudad/ciudad.service';
import { Provincia } from '../pais-provincia-ciudad/provincia/entities/provincia.entity';
import { Ciudad } from '../pais-provincia-ciudad/ciudad/entities/ciudad.entity';


@Injectable()
export class InstalacionesService {

  constructor(
    @InjectRepository(Instalaciones)
    private readonly instalacionesRepo: Repository<Instalaciones>,
    @InjectRepository(Pais)
    private readonly paisRepository: Repository<Pais>,
    @InjectRepository(Provincia)
    private readonly provinciaRepository: Repository<Provincia>,
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>
  ){}

  
  async create() {

    const conta = await this.checkNonCero();

    if(conta === 0){ 
      const firstInstall = new Instalaciones();
      await this.instalacionesRepo.save(firstInstall);
    }

    const tupla: Instalaciones = await this.instalacionesRepo.findOneBy({id: 1});
    
    await this.createCountry(tupla.paisDB);
    return 0;
  }

  async checkNonCero(){
    return await this.instalacionesRepo.count();
  }



  update() { }


  // -------- instalación de países

  async createCountry(paisExistente: boolean) {
    
    //Lo primero es leer los paises
    const { readFileSync } = require('fs');
    const paises =JSON.parse( readFileSync(join(process.cwd(), './src/core/txt/resultado.json')).toString());
    
    const paisesEnBBDD = await this.paisRepository.count();
    const paisesEnTxt  = paises.length;

    let paisesFiltrados: PaisInterface[] = [];
  
    if(paisesEnBBDD !== paisesEnTxt){

      await this.paisRepository.delete;
      await this.preparacionPaises(paises);


      // paisesFiltrados.forEach(async element => {
        
      //   try {
          
      //   } catch (error) {}

      // });
    }

   
  }

  preparacionPaises = (paises: any) => {

  
    
    paises.forEach(async (element: any) => {
    
      if(element.name){
      
        // cambiamos a la translación al castellano
        if(element.translations && element.translations.length > 0){
          element.name = element.translations;
        }

        // asignamos el pais auxiliar para agregarlo al principal, si no tiene estados, lo definiremos
        const paisAux: PaisInterface = {
          id : element.id,
          iso2: element.iso2,
          iso3: element.iso3,
          name: element.name,
        };
        
        const paisIn = this.paisRepository.create(paisAux);
        await this.paisRepository.save(paisIn);
        await this.insertarProvincia(paisIn, element.states);   
    
      }

    });

  }
  // ---------------------- ingreso provincias -----------------------

  public insertarProvincia = (pais: Pais, provincias: any[]) => {
    
    if(provincias){
      
      provincias.forEach(async element => {
        
        if(element.name){

          const provincia: ProvinciaInterface = {
            id: element.id,
            pais: pais,
            name: element.name,
            state_code: element.state_code,
          }
    
          this.salvarProvincias(provincia, pais, element.cities); 
        }
      });
    }
  }

  salvarProvincias = async (provincia: ProvinciaInterface, pais: Pais, ciudades: CiudadesInterface[]) =>{

    try {
      const provSave = this.provinciaRepository.create({
        ...provincia,
        pais
      });
   
      await this.provinciaRepository.save(provSave);

      ciudades.forEach(async element => {

        const ciudadAux: CiudadesInterface = {
          id: element.id,
          name: element.name,
          provincia: provincia
        }
        
        this.insertarCiudades(provSave, ciudadAux);
      });
    } catch (error) { }
  }
  

  // ---------------- ingreso de ciudades ---------------------
  public insertarCiudades = async (provincia: Provincia, ciudad : CiudadesInterface) => {

    const ciudadCreada = this.ciudadRepository.create({
      ...ciudad,
      provincia
    });

    try {
      await this.ciudadRepository.save(ciudadCreada);
      console.log(this.cont++);
    } catch (error) {
      console.log(error);
    }

  }

  public cont = 0;
}
