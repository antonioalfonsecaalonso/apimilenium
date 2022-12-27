/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */

import { 
    nominaliaBBDDatabase, 
    nominaliaBBDDHost,
    nominaliaBBDDPassword, 
    nominaliaBBDDPORT, 
    nominaliaBBDDUser } 
from "src/app.constants";

export class DDBBMaria {

    public mysql    = require('mysql');
    public host     : string;
    public database : string;
    public user     : string;
    public password : string;
    public PORT     : number;
    public conexion : any;

    constructor(hostIn?: string, databaseIn?: string, userIn?: string, passwordIn?: string, portIn?: number){

        if(!hostIn){
            this.host = nominaliaBBDDHost;
        }else{
            this.host = hostIn;
        }

        if(!databaseIn){
            this.database = nominaliaBBDDatabase;
        }else{
            this.database = databaseIn;
        }
        if(!userIn){
            this.user = nominaliaBBDDUser;
        }else{
            this.user = userIn;
        }
        if(!passwordIn){
            this.password = nominaliaBBDDPassword;
        }else{
            this.password = passwordIn;
        }
        if(!portIn){
            this.PORT = nominaliaBBDDPORT;
        }else{
            this.PORT = portIn;
        }

        this.conectar();
    }

    public conectar = () => {
       
        this.conexion = this.mysql.createConnection({
            host : this.host,
            database : this.database,
            user : this.user,
            password : this.password,
            PORT: this.PORT ,
        });
    }

    public insertarQuery = async (inserccionIn: string) => {

        this.conexion.connect();
 
        try {
            const res = await this.conexion.query(inserccionIn, function (error, results, fields) {
                if (error) throw error;
            });
            return res;
        } catch (error) {
            console.log(error);
            this.conexion.end();
        }

        this.conexion.end();
 
    }
}

