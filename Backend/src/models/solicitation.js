"use strict";
export default class Solicitation{

    // Constructor que recibe los parámetros de los objetos
    constructor(idSolicitud, funcionarioAplicativo, funcionarioResponsable, funcionarioFinal, fechaSolicitud, fechaIncio, fechaFin, documentoActaConst, estado, terminado){
        this.idSolicitud = idSolicitud;
        this.funcionarioAplicativo = funcionarioAplicativo;
        this.funcionarioResponsable = funcionarioResponsable;
        this.funcionarioFinal = funcionarioFinal;
        this.fechaSolicitud = fechaSolicitud;
        this.fechaIncio = fechaIncio;
        this.fechaFin = fechaFin;
        this.documentoActaConst = documentoActaConst;
        this.estado = estado;
        this.terminado = terminado;
    }

    get getIdSolicitud() {
        return this.idSolicitud;
    }

    set setIdSolicitud(idSolicitud) {
        this.idSolicitud = idSolicitud;
    }

    get getFuncionarioAplicativo() {
        return this.funcionarioAplicativo;
    }

    set setFuncionarioAplicativo(funcionarioAplicativo) {
        this.funcionarioAplicativo = funcionarioAplicativo;
    }

    get getFuncionarioResponsable() {
        return this.funcionarioResponsable;
    }

    set setFuncionarioResponsable(funcionarioResponsable) {
        this.funcionarioResponsable = funcionarioResponsable;
    }

    get getFuncionarioFinal() {
        return this.funcionarioFinal;
    }

    set setFuncionarioFinal(funcionarioFinal) {
        this.funcionarioFinal = funcionarioFinal;
    }

    get getFechaSolicitud() {
        return this.fechaSolicitud;
    }

    set setFechaSolicitud(fechaSolicitud) {
        this.fechaSolicitud = fechaSolicitud;
    }

    get getFechaIncio() {
        return this.fechaIncio;
    }

    set setFechaIncio(fechaIncio) {
        this.fechaIncio = fechaIncio;
    }

    get getFechaFin() {
        return this.fechaFin;
    }

    set setFechaFin(fechaFin) {
        this.fechaFin = fechaFin;
    }

    get getDocumentoActaConst() {
        return this.documentoActaConst;
    }

    set setDocumentoActaConst(documentoActaConst) {
        this.documentoActaConst = documentoActaConst;
    }

    get getEstado() {
        return this.estado;
    }

    set setEstado(estado) {
        this.estado = estado;
    }

    get getTerminado() {
        return this.terminado;
    }

    set setTerminado(terminado) {
        this.terminado = terminado;
    }
}
