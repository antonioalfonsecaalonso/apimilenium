/* eslint-disable prettier/prettier */
import { RolesBuilder } from "nest-access-control";

export interface rolesBBDD{
    id: number,
    name: string
};

export const rolesExport: rolesBBDD[] = [
    {
        id: 1,
        name: 'SUPERADMIN',
    },
    {
        id: 2,
        name: 'JEFE',
    },
    {
        id: 3,
        name: 'ADMIN',
    },
    {
        id: 4,
        name: 'ADMINISTRATIVO',
    },
    {
        id: 5,
        name: 'PERSONAL',
    },
    {
        id: 6,
        name: 'PINCHERAS'
    },
    {
        id: 7,
        name: 'USER'
    },

]

export enum AppRoles {
    ADMIN          = 'ADMIN',
    ADMINISTRATIVO = 'ADMINISTRATIVO',
    JEFE           = 'JEFE',
    PERSONAL       = 'PERSONAL',
    SUPERADMIN     = 'SUPERADMIN',
    USER           = 'USER'
}

export enum AppResources {
    CIUDAD         = 'CIUDAD',
    COLOR          = 'COLOR',
    DIRECCION      = 'DIRECCION',
    FAMILIA        = 'FAMILIA',
    GRUPO          = 'GRUPO',
    INSTALACIONES  = 'INSTALACIONES',
    PAIS           = 'PAIS',
    PRODUCT        = 'PRODUCT',
    PROVINCIA      = 'PROVINCIA',
    MODELOTEMPORAL = 'MODELOTEMPORAL',
    TALLA          = 'TALLA',
    TEMPORADA      = 'TEMPORADA',
    TIPO           = 'TIPO',
    USER           = 'USER',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
    .grant(AppRoles.SUPERADMIN)
    .createAny([AppResources.USER, AppResources.PRODUCT, AppResources.INSTALACIONES, AppResources.PAIS, AppResources.PROVINCIA, AppResources.CIUDAD, AppResources.COLOR, AppResources.TIPO, AppResources.TEMPORADA, AppResources.TALLA, AppResources.GRUPO, AppResources.FAMILIA, AppResources.DIRECCION, AppResources.MODELOTEMPORAL])
    .readAny(  [AppResources.USER, AppResources.PRODUCT, AppResources.INSTALACIONES, AppResources.PAIS, AppResources.PROVINCIA, AppResources.CIUDAD, AppResources.COLOR, AppResources.TIPO, AppResources.TEMPORADA, AppResources.TALLA, AppResources.GRUPO, AppResources.FAMILIA, AppResources.DIRECCION, AppResources.MODELOTEMPORAL])
    .updateAny([AppResources.USER, AppResources.PRODUCT, AppResources.INSTALACIONES, AppResources.PAIS, AppResources.PROVINCIA, AppResources.CIUDAD, AppResources.COLOR, AppResources.TIPO, AppResources.TEMPORADA, AppResources.TALLA, AppResources.GRUPO, AppResources.FAMILIA, AppResources.DIRECCION, AppResources.MODELOTEMPORAL])
    .deleteAny([AppResources.USER, AppResources.PRODUCT, AppResources.INSTALACIONES, AppResources.PAIS, AppResources.PROVINCIA, AppResources.CIUDAD, AppResources.COLOR, AppResources.TIPO, AppResources.TEMPORADA, AppResources.TALLA, AppResources.GRUPO, AppResources.FAMILIA, AppResources.DIRECCION, AppResources.MODELOTEMPORAL])

    .grant(AppRoles.JEFE)
    .createAny([AppResources.USER, AppResources.PRODUCT, AppResources.PAIS, AppResources.PROVINCIA, AppResources.CIUDAD, AppResources.COLOR, AppResources.TIPO, AppResources.TIPO, AppResources.TEMPORADA, AppResources.TALLA, AppResources.GRUPO, AppResources.FAMILIA, AppResources.DIRECCION, AppResources.MODELOTEMPORAL])
    .readAny(  [AppResources.USER, AppResources.PRODUCT, AppResources.PAIS, AppResources.PROVINCIA, AppResources.CIUDAD, AppResources.COLOR, AppResources.TIPO, AppResources.TIPO, AppResources.TEMPORADA, AppResources.TALLA, AppResources.GRUPO, AppResources.FAMILIA, AppResources.DIRECCION, AppResources.MODELOTEMPORAL])
    .updateAny([AppResources.USER, AppResources.PRODUCT, AppResources.PAIS, AppResources.PROVINCIA, AppResources.CIUDAD, AppResources.COLOR, AppResources.TIPO, AppResources.TIPO, AppResources.TEMPORADA, AppResources.TALLA, AppResources.GRUPO, AppResources.FAMILIA, AppResources.DIRECCION, AppResources.MODELOTEMPORAL])

    .grant(AppRoles.ADMIN)
    .createAny([AppResources.USER, AppResources.PRODUCT, AppResources.PAIS, AppResources.PROVINCIA, AppResources.CIUDAD, AppResources.COLOR, AppResources.TIPO, AppResources.TIPO, AppResources.TEMPORADA, AppResources.TALLA, AppResources.GRUPO, AppResources.FAMILIA, AppResources.DIRECCION, AppResources.MODELOTEMPORAL])
    .readAny(  [AppResources.USER, AppResources.PRODUCT, AppResources.PAIS, AppResources.PROVINCIA, AppResources.CIUDAD, AppResources.COLOR, AppResources.TIPO, AppResources.TIPO, AppResources.TEMPORADA, AppResources.TALLA, AppResources.GRUPO, AppResources.FAMILIA, AppResources.DIRECCION, AppResources.MODELOTEMPORAL])
    .updateAny([AppResources.USER, AppResources.PRODUCT, AppResources.PAIS, AppResources.PROVINCIA, AppResources.CIUDAD, AppResources.COLOR, AppResources.TIPO, AppResources.TIPO, AppResources.TEMPORADA, AppResources.TALLA, AppResources.GRUPO, AppResources.FAMILIA, AppResources.DIRECCION, AppResources.MODELOTEMPORAL])

    .grant(AppRoles.PERSONAL)
    .createAny([AppResources.USER, AppResources.PAIS, AppResources.PROVINCIA, AppResources.CIUDAD, AppResources.COLOR, AppResources.TIPO, AppResources.TEMPORADA, AppResources.TALLA, AppResources.GRUPO, AppResources.FAMILIA, AppResources.DIRECCION])
    .readAny(  [AppResources.USER, AppResources.PAIS, AppResources.PROVINCIA, AppResources.CIUDAD, AppResources.COLOR, AppResources.TIPO, AppResources.TEMPORADA, AppResources.TALLA, AppResources.GRUPO, AppResources.FAMILIA, AppResources.DIRECCION])
    .updateAny([AppResources.USER, AppResources.PAIS, AppResources.PROVINCIA, AppResources.CIUDAD, AppResources.COLOR, AppResources.TIPO, AppResources.TEMPORADA, AppResources.TALLA, AppResources.GRUPO, AppResources.FAMILIA, AppResources.DIRECCION])
    
    .grant(AppRoles.ADMINISTRATIVO)
    .createAny([AppResources.PRODUCT, AppResources.PAIS, AppResources.PROVINCIA, AppResources.CIUDAD, AppResources.COLOR, AppResources.TIPO, AppResources.TEMPORADA, AppResources.TALLA, AppResources.GRUPO, AppResources.FAMILIA, AppResources.DIRECCION, AppResources.MODELOTEMPORAL])
    .readAny(  [AppResources.PRODUCT, AppResources.PAIS, AppResources.PROVINCIA, AppResources.CIUDAD, AppResources.COLOR, AppResources.TIPO, AppResources.TEMPORADA, AppResources.TALLA, AppResources.GRUPO, AppResources.FAMILIA, AppResources.DIRECCION, AppResources.MODELOTEMPORAL])
    .updateAny([AppResources.PRODUCT, AppResources.PAIS, AppResources.PROVINCIA, AppResources.CIUDAD, AppResources.COLOR, AppResources.TIPO, AppResources.TEMPORADA, AppResources.TALLA, AppResources.GRUPO, AppResources.FAMILIA, AppResources.DIRECCION, AppResources.MODELOTEMPORAL])
