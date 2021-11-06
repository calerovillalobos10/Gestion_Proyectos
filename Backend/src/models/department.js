"use strict";
export default class Department {

    // Constructor que revise los parámetros de los objetos
    constructor(idDepartamento, descripcion, estado) {
        this.idDepartamento = idDepartamento;
        this.descripcion = descripcion;
        this.estado = estado;
    }

    get getIdDepartamento() {
        return this.idDepartamento;
    }

    set setIdDepartamento(idDepartamento) {
        this.idDepartamento = idDepartamento;
    }

    get getDescripcion() {
        return this.descripcion;
    }

    set setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }

    get getEstado() {
        return this.estado;
    }

    set setEstado(estado) {
        this.estado = estado;
    }
}