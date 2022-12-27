/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ModeloService } from './modelo.service';
import { CreateModeloDto } from './dto/create-modelo.dto';
import { ProveedorService } from '../proveedores/proveedor.service';
import { FtpClass } from 'src/comon/LIBS/ftp.class';
import { Auth } from 'src/comon/decorators/auth.decorator';
import { AppResources } from 'src/app.roles';


@Controller('modelo')
export class ModeloController {

  public resultadoJose: any;

  constructor(
    private readonly modeloService: ModeloService,
    private readonly proveedorService: ProveedorService
    ) {}

  @Post()
  create(@Body() createModeloDto: CreateModeloDto) {
    return this.modeloService.create(createModeloDto);
  }

  // -------- Esti es para la creacion de los modelos para jose. se borrara en el futuro
  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResources.MODELOTEMPORAL
  })
  @Post("createModeloJose")
  async createJose(@Body() req: ModeloJoseInterface): Promise<any>{

    let objeto: ModeloJoseInterface = req;

    const retorno = await this.modeloService.createModelJose(objeto);
    return req;
  }

  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResources.MODELOTEMPORAL
  })
  @Post("comprobarCreadoJose")
  async comprobarModeloJose(@Body() red: ModeloJoseInterface) {
    
    const Jimp = require("jimp");
    const fs = require("fs");
    //  const lyrics= `${referencia}|@|${cardCode}`;

    const photo = ((red.photo).toString()).split('base64,')[1];


    const buffer = Buffer.from(photo, "base64");
    const cardCode = (await this.proveedorService.findOneByName(`${red.proveedor}`)).codigo;

    Jimp.read(buffer, (err, res) => {
      if (err) throw new Error(err.message);
      res.write(`src/asset/fotos/${cardCode}/${red.referencia}/00.jpg`);
    });

    red.rutaFoto = `${cardCode}${red.referencia}.jpg`;

    const ftpClass = new FtpClass();
    await ftpClass.insertarDatos(`src/asset/fotos/${cardCode}/${red.referencia}/00.jpg`, `fotos/${cardCode}/${red.referencia}/00.jpg`);
    await ftpClass.insertarDatos(`src/asset/fotos/${cardCode}/${red.referencia}/00.jpg`, `ingresarArticulos/fotos/${cardCode}${red.referencia}.jpg`);

  
    await this.modeloService.ingresoEnMayorNominalia(red);

    const file = fs.readFileSync('src/asset/modeloJose.txt','utf8');
    return({"articulo" : file});

  }

  // ************************************************************************************
}


export interface ModeloJoseInterface {
  photo: Blob;
  tipo : string;
  grupo: string;
  familia: string;
  temporada: string;
  proveedor: string;
  denominacion: string;
  referencia: string;
  preciocompra: number;
  pvp: number;
  precioMayor: number;
  precioFranquicia: number;
  etiquetaRoja: number | null | undefined;
  colores: string[];
  tallaNormal: string[];
  tallaNino: string[];
  tallaHomMuj: string[];
  tallaZapato: string[];
  tallaCinturon: string[];
  tallaLenceria: string[];
  tallaResto: string[];
  tallaBebe: string[];
  lotesRadio: number;
  mostrarMayor: string;
  fechaEntrada: string;
  fechaDatePickerMaterial: string;
  rutaFoto: string;

}