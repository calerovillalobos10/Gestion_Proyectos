"use strict";
export default class Functionary {

    // Constructor que revise los parámetros de los objetos
    constructor(idFuncionario, sexo, department, tipoFuncionario, nombre, apellido_1, apellido_2, fechaNacimiento, correo, contrasenia, urlFoto, estado) {
        this.idFuncionario = idFuncionario;
        this.sexo = sexo;
        this.department = department;
        this.tipoFuncionario = tipoFuncionario;
        this.nombre = nombre;
        this.apellido_1 = apellido_1;
        this.apellido_2 = apellido_2;
        this.fechaNacimiento = fechaNacimiento;
        this.correo = correo;
        this.contrasenia = contrasenia;
        this.urlFoto = urlFoto;
        this.estado = estado;
    }

    get getIdFuncionario() {
        return this.idFuncionario;
    }

    set setidFuncionario(idFuncionario) {
        this.idFuncionario = idFuncionario;
    }

    get getSexo() {
        return this.sexo;
    }

    set setSexo(sexo) {
        this.sexo = sexo;
    }

    get getDepartment() {
        return this.department;
    }

    set setDepartment(department) {
        this.department = department;
    }

    get getTipoFuncionario() {
        return this.tipoFuncionario;
    }

    set setTipoFuncionario(tipoFuncionario) {
        this.tipoFuncionario = tipoFuncionario;
    }

    get getNombre() {
        return this.nombre;
    }

    set setNombre(nombre) {
        this.nombre = nombre;
    }

    get getApellido_1() {
        return this.apellido_1;
    }

    set setApellido_1(apellido_1) {
        this.apellido_1 = apellido_1;
    }

    get getApellido_2() {
        return this.apellido_2;
    }

    set setApellido_2(apellido_2) {
        this.apellido_2 = apellido_2;
    }

    get getFechaNacimiento() {
        return this.fechaNacimiento;
    }

    set setFechaNacimiento(fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    get getCorreo() {
        return this.correo;
    }

    set setCorreo(correo) {
        this.correo = correo;
    }

    get getContrasenia() {
        return this.contrasenia;
    }

    set setContrasenia(contrasenia) {
        this.contrasenia = contrasenia;
    }

    get getUrlFoto() {
        return this.urlFoto;
    }

    set setUrlFoto(urlFoto) {
        this.urlFoto = urlFoto;
    }

    get getEstado() {
        return this.estado;
    }

    set setEstado(estado) {
        this.estado = estado;
    }
}