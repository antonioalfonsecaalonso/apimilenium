"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Familia = void 0;
/* eslint-disable prettier/prettier */
var typeorm_1 = require("typeorm");
var grupo_entity_1 = require("../../grupo/entities/grupo.entity");
var Familia = /** @class */ (function () {
    function Familia() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)('text', {
            unique: true
        })
    ], Familia.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)('text', {
            unique: true
        })
    ], Familia.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)('text', {})
    ], Familia.prototype, "tipa");
    __decorate([
        (0, typeorm_1.Column)('int', {})
    ], Familia.prototype, "docEntry");
    __decorate([
        (0, typeorm_1.Column)('bool', {
            "default": true
        })
    ], Familia.prototype, "active");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Familia.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Familia.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return grupo_entity_1.Grupo; }, function (grupo) { return grupo.familia; })
    ], Familia.prototype, "grupo");
    Familia = __decorate([
        (0, typeorm_1.Entity)('familia')
    ], Familia);
    return Familia;
}());
exports.Familia = Familia;
