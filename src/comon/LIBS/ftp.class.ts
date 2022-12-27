import { nominaliaHdd, nominaliaUser, nominaliaPassword } from '../../app.constants';
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-empty-function */

export class FtpClass {
    
    public host      = nominaliaHdd;
    public user      = nominaliaUser;
    public password  = nominaliaPassword;
    public secure    = true;
    public client: any;


    constructor(host?: string, user?: string, password?: string, secure?: boolean) {
        
        if(host){
            this.host = host;
        }

        if(user){
            this.user = user;
        }

        if(password){
            this.password = password;
        }

        if(secure){
            this.secure = secure;
        }

    }
    
    public archivoSubir = '';
    public insertarDatos = async (archivoIn: string, directorioOut: string) => {
 
        const ftp = require("basic-ftp"); 
        const client = new ftp.Client();

        this.archivoSubir = archivoIn;
      // client.ftp.verbose = true
        try {

            await client.access({
                host: "lhcp2087.webapps.net",
                user: "alfonsecar@mileniummoda.online",
                password: "Alfonina123",
                secure: true,
                port : 21
            }).then( async () => {

                try {
                    
                    await client.ensureDir(directorioOut)
                    .then(async () => {
    
                        try {
                            await client.uploadFrom(this.archivoSubir)
                            client.close()
                        } catch (error) {
                            client.close();
                        }
    
                    })
                } catch (error) {
                    client.close();
                }


            })
            
        }
        catch(err: any) {
            console.log(err);
            client.close()
        }
        
    }
}


/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable prefer-const */


// export class FtpClass {

//     public ftp = require('basic-ftp');
//     public fs = require('fs');

//     public host      = "ftp.mileniummoda.online";
//     public user      = "alfonsecar@mileniummoda.online";
//     public password  = "Alfonina123";
//     public port      = '21';
//     public secure    = true;
//     public client: any;
//     public settings: { 
//         host: string;
//         port: any; 
//         user: any; 
//         password: string; 
//         secure: boolean; 
//     };


//     constructor(host?: string, user?: string, password?: string, secure?: boolean) {
     
//         this.client = this.ftp.Client;

//         if(host){
//             this.host = host;
//         }

//         if(user){
//             this.user = user;
//         }

//         if(password){
//             this.password = password;
//         }

//         if(secure){
//             this.secure = secure;
//         }

//         this.client = new this.ftp.Client();
//         this.settings = {
//             host: this.host,
//             port: this.port,
//             user: this.user,
//             password: this.password,
//             secure: this.secure
//         };

//     }
    

//     upload = async (sourcePath: any, remotePath: string, permissionsIn: any) => {
        
//         let self = this;

        
    
//         (async () => {
//             try {
//                 console.log("ok0");
                
//                 let access = await self.client.access({
//                     host : "lhcp2087.webapps.net",
//                     user : "alfonsecar@mileniummoda.online",
//                     password : "Alfonina123",
//                     port : '21',
//                     secure : true,
//                     path : '/',
//                 });
//                 console.log(access);
//                 let upload = await self.client.upload(this.fs.createReadStream(sourcePath), remotePath);
//                 console.log("ok2");
//                 let permissions = await self.changePermissions(permissionsIn.toString(), remotePath);
//                 console.log("ok3");
//             } catch(err) {
//                 console.log(err);
//             }
//             self.client.close();
//         })();
//     }

//     close() {
//         this.client.close();
//     }

//     changePermissions(perms: string, filepath: string) {
//         let cmd = 'SITE CHMOD ' + perms + ' ' + filepath;
//         return this.client.send(cmd, false);
//     }
// }






