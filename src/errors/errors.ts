/* eslint-disable prettier/prettier */
import { BadRequestException, Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';

export const obtenerError = (service: string, error: any | null, personalizado?: string, mensaje?: string): any => {
    
    const logger = new Logger(service);
    console.log(logger.error(error));
    
    if(error && error !== null){
        const errorMsg = error.detail;

        if(error.code === '23505'){
          throw new BadRequestException(errorMsg);
        } 
    }
    else{
        if(personalizado === 'notFound'){
          throw new NotFoundException(`No existe ningún ${mensaje} con ese id.`)
        }
        else if(personalizado === 'delete'){
          throw new InternalServerErrorException('Error, existe algún tipo de problema en el borrado del artículo.')
        }

    }

    if(!error || error === null){
      if(personalizado === 'provinciaNoCoincidente'){
       
      }
    }
  // throw new InternalServerErrorException('Error inesperado, por favor, intentelo en unos minutos, si el problema persiste, pongase en contacto con el desarrollador de software.')
   
}