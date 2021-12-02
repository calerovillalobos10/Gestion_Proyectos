"use strict";
export default class Advance {

    // Constrcutor que recibe los parámetros de los objetos
    constructor(idAvance, trimestre, funcionarioAplicativo, idSolicitud, fechaAvance, documento, estado) {
        this.idAvance = idAvance;
        this.trimestre = trimestre;
        this.funcionarioAplicativo = funcionarioAplicativo;
        this.idSolicitud = idSolicitud;
        this.fechaAvance = fechaAvance;
        this.documento = documento;
        this.estado = estado;
    }

    get getIdAvance () {
        return this.idAvance;
    }

    set setIdAvance (idAvance) {
        this.idAvance = idAvance;
    }

    get getTrimestre () {
        return this.trimestre;
    }

    set setTrimestre (trimestre) {
        this.trimestre = trimestre;
    }

    get getFuncionarioAplicativo () {
        return this.funcionarioAplicativo;
    }

    set setFuncionarioAplicativo (funcionarioAplicativo) {
        this.funcionarioAplicativo = funcionarioAplicativo;
    }

    get getIdSolicitud () {
        return this.idSolicitud;
    }

    set setIdSolicitud (idSolicitud) {
        this.idSolicitud = idSolicitud;
    }

    get getFechaAvance () {
        return this.fechaAvance;
    }

    set setFechaAvance (fechaAvance) {
        this.fechaAvance = fechaAvance;
    }

    get getDocumento () {
        return this.documento;
    }

    set setDocumento (documento) {
        this.documento = documento;
    }

    get getEstado () {
        return this.estado;
    }

    set setEstado (estado) {
        this.estado = estado;
    }
}