"use strict";
export default class Binnacle {

    // Constructor que recibe los parámetros del objeto
    constructor (idBitacora, transaccion, funcionarioAplicativo, idAvance, idSolicitud, fechaBitacora){
        this.idBitacora = idBitacora;
        this.transaccion = transaccion;
        this.funcionarioAplicativo = funcionarioAplicativo;
        this.idAvance = idAvance;
        this.idSolicitud = idSolicitud;
        this.fechaBitacora = fechaBitacora;
    }

    get getIdBitacora () {
        return this.idBitacora;
    }

    set setIdBitacora (idBitacora) {
        this.idBitacora = idBitacora;
    }

    get getTransaccion () {
        return this.transaccion;
    }

    set setTransaccion (transaccion) {
        this.transaccion = transaccion;
    }

    get getFuncionarioAplicativo () {
        return this.funcionarioAplicativo;
    }

    set setFuncionarioAplicativo (funcionarioAplicativo) {
        this.funcionarioAplicativo = funcionarioAplicativo;
    }

    get getIdAvance () {
        return this.idAvance;
    }

    set setIdAvance (idAvance) {
        this.idAvance = idAvance;
    }

    get getIdSolicitud () {
        return this.idSolicitud;
    }

    set setIdSolicitud (idSolicitud) {
        this.idSolicitud = idSolicitud;
    }

    get getFechaBitacora () {
        return this.fechaBitacora;
    }

    set setFechaBitacora (fechaBitacora) {
        this.fechaBitacora = fechaBitacora;
    }

}