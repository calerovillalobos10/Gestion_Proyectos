class Department{

    private idDepartamento : number;
    private descripcion : string;
    private estado : boolean;

    // Constructor que revise los parámetros de los objetos
    constructor(idDepartamento : number, descripcion : string, estado : boolean){
        
        this.idDepartamento = idDepartamento; 
        this.descripcion = descripcion;
        this.estado = estado;
    }

    get getIdDepartamento () : number {
        return this.idDepartamento;
    }

    set setIdDepartamento (idDepartamento : number){
        this.idDepartamento = idDepartamento;
    }

    get getDescripcion () : string {
        return this.descripcion;
    }

    set setDescripcion (descripcion : string){
        this.descripcion = descripcion;
    }

    get getEstado () : boolean{
        return this.estado;
    }

    set setEstado (estado : boolean){
        this.estado = estado;
    }
}

const departamento = new Department(1, "descripcion", true)

console.log(departamento.getIdDepartamento)