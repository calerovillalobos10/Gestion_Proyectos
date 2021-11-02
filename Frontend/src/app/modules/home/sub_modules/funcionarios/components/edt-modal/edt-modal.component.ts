import { Departamento } from '@core/models/Departamento';
import { DepartamentosService } from '@core/services/departamentos/departamentos.service';
import { AlertService } from '@core/services/alert/alert.service';
import { Funcionario } from '@core/models/Funcionario';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionariosService } from '@core/services/funcionarios/funcionarios.service';

@Component({
  selector: 'app-edt-modal',
  templateUrl: './edt-modal.component.html',
  styleUrls: ['./edt-modal.component.scss']
})
export class EdtModalComponent implements OnInit {
  public form!: FormGroup;
  public formToggle: boolean;
  public openedModal: boolean;

  private userId: number;     
  public departamentos: Array<Departamento>;

  private oldPicture: string | ArrayBuffer | null | undefined;
  public preview: string | ArrayBuffer | null | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private service: FuncionariosService,
    private alertService: AlertService,
    private deptService: DepartamentosService
  ) {
    this.departamentos = this.deptService.getAll();
    this.departamentos = [{descripcion: 'TI', idDepartamento: 1},{descripcion: 'RRHH', idDepartamento: 2}]

    this.formToggle = false
    this.openedModal = false
    this.userId = 0

    this.buildForm();

    this.preview = '';
    this.oldPicture = '';
  }

  ngOnInit(): void {
    this.service.modalNeeded.subscribe(data => {
      if (data.subject === 'editModal') {
        this.openedModal = data.status
        this.formToggle = !data.status
        this.userId = data.userId
        this.loadEditUser()
      }
    })
  }

  // Esta funcion tiene que traer del back el usuario a editar.
  async loadEditUser() {

    //const userData: Funcionario = await this.service.getById(this.userId); -------------------------------Al tener el back----------------------

    const userData: Funcionario =
    {
      correo: 'Luis@gmail.com', idTipoFuncionario: '1', idDepartamento: '33', nombre: 'Luis', apellido1: "apellido1",
      apellido2: "apellido2", fechaNacimiento: '1995-09-09', idSexo: '1', urlFoto: 'http://localhost:4200/assets/images/not_found_user.png'
    }

    // Guardamos la foto anterior por si no se modifica.
    this.oldPicture = userData.urlFoto;

    // Esto valida si no esta conteneido el departamento enviado.
    if (! this.departamentos.some(e => e.idDepartamento == userData.idDepartamento)) {}

    this.form.patchValue({
      correo: userData.correo,
      nombre: userData.nombre,
      apellido1: userData.apellido1,
      apellido2: userData.apellido2,
      departamento: userData.idDepartamento,
      tipo: userData.idTipoFuncionario,
      sexo: userData.idSexo,
      nacimiento:userData.fechaNacimiento
    })
    
    setTimeout(()=>{
      this.preview = userData.urlFoto;
     })
  }

  // Esta funcion perpara la edicion del funcionario
  async edt_func() {
    this.form.markAllAsTouched();
    if(this.form.valid){
      
      // Envia datos y espera la respuesta del backend.
      if(await this.service.update(this.obtainFunc())){ //--------------------------------------- Al tener el back ----------------------
          this.closeModal();  
          this.alertService.promiseAlert('Se agregó correctamente el funcionario').then(()=>{
          this.service.updateNeeded.emit(true)
        })
      }else{
        // Si el backend envia una respuesta incorrecta.
        this.alertService.simpleAlert('Surgió un error inténtelo nuevamente')
      }
    }
  }

  // Metodo que destruye formulario y datos cargados al modal
  async closeModal() {
    this.formToggle = true;
    setTimeout(() => { this.openedModal = false }, 500)
    this.form.reset()
    this.preview = '';
  }

  // Metodo para cambiar el preview de la foto del funcionario.
  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.preview = event.target?.result;
      }

    } else {
      // Si se elimina la foto del campo formulario se coloca la anterior.
      this.preview = this.oldPicture;
    }
  }

    // Extrae los datos de un funcionario valido a un objeto funcionario
    obtainFunc():Funcionario {
      return {
        idFuncionario: this.userId,
        correo: this.form.value.correo,
        idSexo: this.form.value.sexo,
        idDepartamento: this.form.value.departamento,
        idTipoFuncionario: this.form.value.tipo,
        fechaNacimiento: this.form.value.nacimiento,
        nombre: this.form.value.nombre,
        apellido1: this.form.value.apellido1,
        apellido2: this.form.value.apellido2,
        urlFoto: this.preview === '' ? this.oldPicture : this.preview
      }
    }

    // Construye el formulario con los campos requeridos.
    buildForm() {
      this.form = this.formBuilder.group({
        correo: ["", [
            Validators.required,
            Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"),
            Validators.maxLength(50) ]],
        departamento: ["", [ 
          Validators.required, 
          Validators.min(1), 
          Validators.max(255)
        ]],
        tipo: ["", [ 
          Validators.required, 
          Validators.min(1), 
          Validators.max(255)
        ]],
        foto: ["", [ 
          Validators.required,
          Validators.pattern('^(.)*.(jpe?g|png|webp)$')
        ]],
        nombre: ["", [ 
          Validators.required, 
          Validators.minLength(3), 
          Validators.maxLength(15) 
        ]],
        apellido1: ["", [
          Validators.required, 
          Validators.minLength(3), 
          Validators.maxLength(15) 
        ]],
        apellido2: ["", [ 
          Validators.required, 
          Validators.minLength(3), 
          Validators.maxLength(15) 
        ]],
        sexo: ["", [ 
          Validators.required, 
          Validators.min(1), 
          Validators.max(255) 
        ]],
        nacimiento: ["", [ Validators.required ]],
      })
    }
}