/* eslint-disable prettier/prettier */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-var-requires */

import { DDBBMaria } from "src/comon/LIBS/bbddMariaDB.class";

export const insertandoEnBBDDModelosJose =  async (texto: string, referencia: string, cardCode: string, nombre: string): Promise<any> =>{

    const rutafoto =  `/${cardCode}/${referencia}/00.jpg`
    const inserccion = `INSERT INTO ff3irk79_varios.ingreso_articulos ` +
    ` (texto, referencia, proveedor, foto) VALUES ` +
    ` (\'${texto}\', \'${referencia}\', \'${cardCode}\', \'${rutafoto}\'); `;
    
    const bbddNominalia = new DDBBMaria();
    const resultado = await bbddNominalia.insertarQuery(inserccion);

    
    const fs = require('fs');
    const lyrics= `${referencia}|@|${nombre}`;
    fs.writeFile('src/asset/modeloJose.txt', lyrics, (err) => {
        if (err) throw err;
    });
    
    return resultado;

}