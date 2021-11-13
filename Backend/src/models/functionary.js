"use strict";
export default class Functionary {

    // Constructor que revise los parámetros de los objetos
    constructor( idFuncionario=null, idSexo, idDepartamento, idTipoFuncionario, nombre, apellido_1, apellido_2, fechaNacimiento, correo, contrasenia, urlFoto, estado=null, dobleAuth=null, secretUrl=null ) {
        this.idFuncionario = idFuncionario;
        this.idSexo = idSexo;
        this.idDepartamento = idDepartamento;
        this.idTipoFuncionario = idTipoFuncionario;
        this.nombre = nombre;
        this.apellido_1 = apellido_1;
        this.apellido_2 = apellido_2;
        this.fechaNacimiento = fechaNacimiento;
        this.correo = correo;
        this.contrasenia = contrasenia;
        this.urlFoto = urlFoto;
        this.estado = estado;
        this.dobleAuth = dobleAuth;
        this.secretUrl = secretUrl;
    }

    get getIdFuncionario() {
        return this.idFuncionario;
    }

    set setidFuncionario(idFuncionario) {
        this.idFuncionario = idFuncionario;
    }

    get getSexo() {
        return this.idSexo;
    }

    set setSexo(idSexo) {
        this.idSexo = idSexo;
    }

    get getDepartment() {
        return this.idDepartamento;
    }

    set setDepartment(idDepartamento) {
        this.idDepartamento = idDepartamento;
    }

    get getTipoFuncionario() {
        return this.idTipoFuncionario;
    }

    set setTipoFuncionario(idTipoFuncionario) {
        this.idTipoFuncionario = idTipoFuncionario;
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

    get getDobleAuth() {
        return this.dobleAuth;
    }

    set setDobleAuth(dobleAuth) {
        this.dobleAuth = dobleAuth;
    }

    get getSecretUrl() {
        return this.secretUrl;
    }

    set setSecretUrl(secretUrl) {
        this.secretUrl = secretUrl;
    }
}