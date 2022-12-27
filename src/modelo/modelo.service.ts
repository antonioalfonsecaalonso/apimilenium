/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateModeloDto } from './dto/create-modelo.dto';
import { UpdateModeloDto } from './dto/update-modelo.dto';
import { TallasService } from '../products/tallas/tallas.service';
import { ModeloJoseInterface } from './modelo.controller';
import { ProveedorService } from '../proveedores/proveedor.service';
import { Talla } from '../products/tallas/entities/talla.entity';
import { Proveedor } from '../proveedores/entities/proveedor.entity';
import { Grupo } from '../products/grupo/entities/grupo.entity';
import { FamiliaService } from '../products/familia/familia.service';
import { Familia } from '../products/familia/entities/familia.entity';
import { Color } from '../products/color/entities/color.entity';
import { ColorService } from '../products/color/color.service';
import { TemporadaService } from '../products/temporada/temporada.service';
import { GrupoService } from '../products/grupo/grupo.service';
import { insertandoEnBBDDModelosJose } from './modeloJose';
import { escape } from 'querystring';
import { DDBBMaria } from 'src/comon/LIBS/bbddMariaDB.class';
import { elementAt } from 'rxjs';

@Injectable()
export class ModeloService {
 

  constructor(
    private readonly tallaService     : TallasService,
    private readonly proveedorService : ProveedorService,
    private readonly familiaService   : FamiliaService,
    private readonly colorService     : ColorService,
    private readonly temporadaService : TemporadaService,
    private readonly grupoService     : GrupoService,
  ) {
    
  }

  createModelJose = async (createModelJose : ModeloJoseInterface): Promise<any> =>{

    // eslint-disable-next-line prefer-const
    let tallas: any[] = [];

    createModelJose.tallaBebe.forEach(element => {
      
       tallas.push(parseInt(element)); 
    });

    createModelJose.tallaCinturon.forEach(element => {
      tallas.push(parseInt(element)); 
    })

    createModelJose.tallaHomMuj.forEach(element => {
      tallas.push(parseInt(element)); 
    })

    createModelJose.tallaLenceria.forEach(element => {
      tallas.push(parseInt(element)); 
    })

    createModelJose.tallaNino.forEach(element => {
      tallas.push(parseInt(element)); 
    })

    createModelJose.tallaNormal.forEach(element => {
      tallas.push(parseInt(element)); 
    })

    createModelJose.tallaResto.forEach(element => {
      tallas.push(parseInt(element)); 
    })

    createModelJose.tallaZapato.forEach(element => {
      tallas.push(parseInt(element)); 
    })
    
 
    const modeloVolcar: ModeloJoseInterf = {
      tallas:  await this.tallaService.obtenerVariasTallas(tallas),
      proveedor: await this.proveedorService.findOneByName(createModelJose.proveedor),
      familia: await this.familiaService.findOneByName(createModelJose.familia),
      colores: createModelJose.colores,
      temporada: (await this.temporadaService.findOneByName(createModelJose.temporada)).code,
      grupo: (await this.grupoService.findOneByName(createModelJose.grupo)).id,
      referencia: createModelJose.referencia,
    
    }


    let tallasSql: string[] = [];
    let coloresSql: string[] = [];
    let mainSql: string = '';

    let tallaje = '';

    let descripcionSql: string = '';

      modeloVolcar.tallas.forEach(element => {
        
        tallasSql.push(`INSERT [B1_GRUPONM_ES].[dbo].[NM_ALFMODELOTALLA] ([MODELOw], [U_SEITaje], [U_SEITalla]) VALUES (N''${modeloVolcar.proveedor.codigo}${modeloVolcar.familia}${createModelJose.referencia}'', N''${element.code}'', N''${element.tallaDesc}'')`);
        tallaje = element.code;
      });

      modeloVolcar.colores.forEach(element=> {

        coloresSql.push(`INSERT [B1_GRUPONM_ES].[dbo].[NM_ALFMODELOCOLOR] ([MODELOw], [U_SEIColor]) VALUES VALUES (N''${modeloVolcar.proveedor.codigo}${modeloVolcar.familia}${createModelJose.referencia}'', N''${element}'')`);
      });
  

      descripcionSql = `${createModelJose.referencia} ${createModelJose.denominacion}`;

     
     
      mainSql = `INSERT [B1_GRUPONM_ES].[dbo].[NM_ALFMODELO] ([MODELOw], [Descri], [Tallaje], [Temp], [Grupo], [RefProv], [CProv], [Familia], [PCOMPRA], [PMAYOR], [PFRANQUICIA], [PVP], [ETIQROJA]) VALUES (N''${descripcionSql}'', N''${tallaje}'', N''${modeloVolcar.temporada}'', N''${modeloVolcar.grupo}'', N''${modeloVolcar.referencia}'', N''${modeloVolcar.proveedor.codigo}'', N''${modeloVolcar.familia}'', CAST(${createModelJose.preciocompra} AS Decimal(8, 2)), CAST(${createModelJose.precioMayor} AS Decimal(8, 2)), CAST(${createModelJose.precioFranquicia} AS Decimal(8, 2)), CAST(${createModelJose.pvp} AS Decimal(8, 2)), CAST(${createModelJose.etiquetaRoja} AS Decimal(8, 2)));`;

      let fraseFinish = '';

      tallasSql.forEach(element => {
        fraseFinish = (fraseFinish + (element));
      });

      coloresSql.forEach(element => {
        fraseFinish = fraseFinish + (element);
      });

      fraseFinish = fraseFinish + (mainSql);

      
      return insertandoEnBBDDModelosJose(fraseFinish, modeloVolcar.referencia, modeloVolcar.proveedor.codigo, modeloVolcar.proveedor.denominacion);
 
  }

 
  
  create(createModeloDto: CreateModeloDto) {
    return 'This action adds a new modelo';
  }

  findAll() {
    return `This action returns all modelo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} modelo`;
  }

  update(id: number, updateModeloDto: UpdateModeloDto) {
    return `This action updates a #${id} modelo`;
  }

  remove(id: number) {
    return `This action removes a #${id} modelo`;
  }
//----------------------------------------------------------------
  async ingresoEnMayorNominalia(modelo: ModeloJoseInterface) {


    const colores: Color[] = await this.colorService.obtenerColoresPorId(modelo.colores);
    
    let coloresFinal: string = '';
    colores.forEach( (element: Color) => {
      coloresFinal+= (element.color + ",");
    })

    coloresFinal = coloresFinal.substring(0, coloresFinal.length - 1);

    let tallas: string = '';

    if(modelo.tallaBebe) {
      let aux: Talla[] = await this.tallaService.obtenerVariasTallas(modelo.tallaBebe); 
    
      aux.forEach( (element: Talla) => {
        tallas+= this.comprobarTallaDesdeSap(element.tallaDesc) + ",";
      })
    }
    if(modelo.tallaZapato) {
      let aux: Talla[] = await this.tallaService.obtenerVariasTallas(modelo.tallaZapato); 
    
      aux.forEach( (element: Talla) => {
        tallas+= this.comprobarTallaDesdeSap(element.tallaDesc) + ",";
      })
    }
    if(modelo.tallaResto) {
      let aux: Talla[] = await this.tallaService.obtenerVariasTallas(modelo.tallaResto); 
    
      aux.forEach( (element: Talla) => {
        tallas+= this.comprobarTallaDesdeSap(element.tallaDesc) + ",";
      })
    }
    if(modelo.tallaNormal) {
      let aux: Talla[] = await this.tallaService.obtenerVariasTallas(modelo.tallaNormal); 
    
      aux.forEach( (element: Talla) => {
        tallas+= this.comprobarTallaDesdeSap(element.tallaDesc) + ",";
      })
    }
    if(modelo.tallaNino) {
      let aux: Talla[] = await this.tallaService.obtenerVariasTallas(modelo.tallaNino); 
    
      aux.forEach( (element: Talla) => {
        tallas+= this.comprobarTallaDesdeSap(element.tallaDesc) + ",";
      })
    }
    if(modelo.tallaLenceria) {
      let aux: Talla[] = await this.tallaService.obtenerVariasTallas(modelo.tallaLenceria); 
    
      aux.forEach( (element: Talla) => {
        tallas+= this.comprobarTallaDesdeSap(element.tallaDesc) + ",";
      })
    }
    if(modelo.tallaHomMuj) {
      let aux: Talla[] = await this.tallaService.obtenerVariasTallas(modelo.tallaHomMuj); 
    
      aux.forEach( (element: Talla) => {
        tallas+= this.comprobarTallaDesdeSap(element.tallaDesc) + ",";
      })
    }
    if(modelo.tallaCinturon) {
      let aux: Talla[] = await this.tallaService.obtenerVariasTallas(modelo.tallaCinturon); 
    
      aux.forEach( (element: Talla) => {
        tallas+= this.comprobarTallaDesdeSap(element.tallaDesc) + ",";
      })
    }
   
    tallas = tallas.substring(0, tallas.length - 1);

   
   
    if(modelo.fechaDatePickerMaterial && modelo.fechaDatePickerMaterial !== undefined){

      const aux = (modelo.fechaDatePickerMaterial.split(':')[0]).split('-');
      const dia = aux[2].split('T')[0];

      modelo.fechaDatePickerMaterial = aux[0] + '-' + aux[1] + '-' + dia;
    }else{
      modelo.fechaDatePickerMaterial = '';
    }

    
    const inserccion = `INSERT INTO ff3irk79_alfonbbdd.0001temporalcompras (
      zona, 
      referencia, 
      nombrearticulo, 
      nombreproveedor, 
      preciocompra, 
      ventamayor, 
      ventafranquicia, 
      temporada, 
      colores, 
      tallas, 
      categoria, 
      pedidominimo, 
      fechaentrada, 
      mostrar, 
      rutafoto, 
      prepararPrenda, 
      creadoAnterior, 
      pvp, 
      descripcionweb) 
      VALUES 
      ('MADRID', 
      '${modelo.referencia}',
      '${modelo.denominacion}', 
      '${modelo.proveedor}',    
      '${modelo.preciocompra}',  
      '${modelo.precioMayor}',  
      '${modelo.precioFranquicia}',     
      '${modelo.temporada}', 
      '${coloresFinal}', 
      '${tallas}', 
      '${modelo.tipo}',  
      '${modelo.lotesRadio}',  
      '${modelo.fechaDatePickerMaterial}',  
      '${modelo.mostrarMayor}',  
      '${modelo.rutaFoto}', 
      '1', 
      '0',  
      '${modelo.pvp}',  
      '0')`; 
    
   
     
    const bbddNominalia = new DDBBMaria();
    const resultado = await bbddNominalia.insertarQuery(inserccion);
    return resultado;

  }

  comprobarTallaDesdeSap = (tallaIn: string) => {

    if(tallaIn === '0XXS') return 'XXS';
    if(tallaIn === '1XS') return 'XS';
    if(tallaIn === '2S') return 'S';
    if(tallaIn === '3M') return 'M';
    if(tallaIn === '4L') return 'L';
    if(tallaIn === '5XL') return 'XL';
    if(tallaIn === '6XXL') return 'XXL';
    if(tallaIn === '7XXXL') return 'XXXL';
    if(tallaIn === '84XL') return 'XL';
    if(tallaIn === '95XL') return 'XL';
    if(tallaIn === '106XL') return 'XL';
    if(tallaIn === '117XL') return 'XL';

    return tallaIn;
  }
}

export interface ModeloJoseInterf {
  tallas: Talla[];
  proveedor: Proveedor;
  familia: string;
  colores: string[];
  temporada: string;
  grupo: string;
  referencia: string;
}


