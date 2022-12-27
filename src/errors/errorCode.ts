/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

export const errorCodeUser = (code:number): string => {
    
    let msgReturn = '';

    switch (code) {
        case 9001:

            msgReturn = "El campo nombre no puede ser Inferior a 3 carácteres.";
            break;
        case 9002:

            msgReturn = "El campo nombre no puede ser Superior a 50 carácteres.";
            break;
        case 9003:

            msgReturn = "El campo apellido no puede ser Inferior a 3 carácteres.";
            break;
        case 9004:

            msgReturn = "El campo apellido no puede ser Superior a 50 carácteres.";
            break;
        case 9005:

            msgReturn = "El campo apellido2 no puede ser Superior a 3 carácteres.";
            break;
        case 9006:

            msgReturn = "El campo apellido2 no puede ser Superior a 50 carácteres.";
            break;
        case 9007:

            msgReturn = "El campo telefono no puede ser Superior a 8 carácteres.";
            break;
        case 9008:

            msgReturn = "El campo telefono no puede ser Superior a 8 carácteres.";
            break;
        case 9009:

            msgReturn = "El campo e-mail no parece ser un email válido.";
            break;
        case 9010:

            msgReturn = "El campo DNI no puede ser Inferior a 9 carácteres.";
            break;
            case 9011:

            msgReturn = "El campo DNI no puede ser Superior a 9 carácteres.";
            break;
        case 9012:

            msgReturn = "El campo sexo no puede aparecer vacío.";
            break;
        case 9013:

            msgReturn = "El campo PASSWORD no puede ser inferior a 3 carácteres.";
            break;
        case 9014:

            msgReturn = "El campo PASSWORD no puede ser Superior a 10 carácteres.";
            break;
        case 9015:

            msgReturn = "El campo USUARIO no puede ser inferior a 3 carácteres.";
            break;
        case 9016:

            msgReturn = "El campo USUARIO no puede ser Superior a 100 carácteres.";
            break
        case 9017:

            msgReturn = "El campo PERMISOS no puede ser inferior a 3 carácteres.";
            break;
        case 9018:

            msgReturn = "El campo PERMISOS no puede ser Superior a 15 carácteres.";
            break;
        case 9019:

            msgReturn = "El campo NOMBRE, no puede estar vacío.";
            break;
        case 9020:

            msgReturn = "El campo nombre no puede ser numeral.";
            break;
        case 9021:

            msgReturn = "El PRIMER APELLIDO no puede estar vacío.";
            break;
            
        case 9022:

            msgReturn = "El SEGUNDO APELLIDO no puede estar vacío.";
            break;
        case 9023:

            msgReturn = "El TELÉFONO no puede estar vacío.";
            break;
        case 9024:

            msgReturn = "El EMAIL no puede estar vacío.";
            break;
        case 9025:

            msgReturn = "El DNI no puede estar vacío.";
            break;
        case 9026:

            msgReturn = "No ha ingresado un SEXO válido, opción incorrecta.";
            break;
        case 9027:

            msgReturn = "El Password no puede estar vacío..";
            break;
        case 9028:

            msgReturn = "El Permisos no puede estar vacío..";
            break;

        default:
            break;
    }

    return msgReturn;
}