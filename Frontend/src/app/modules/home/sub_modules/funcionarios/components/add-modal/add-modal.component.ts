import { AlertService } from '@core/services/alert/alert.service';
import { Funcionario } from '@core/models/Funcionario';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionariosService } from '@core/services/funcionarios/funcionarios.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})

export class AddModalComponent implements OnInit {
  public form!: FormGroup;
  public formToggle: boolean;
  public openedModal: boolean;
  public preview: string | ArrayBuffer | null | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private service: FuncionariosService,
    private alertService: AlertService
  ) {
  
    this.formToggle = false
    this.openedModal = false
    this.preview = '';

    this.buildForm();
  }

  ngOnInit(): void {
    this.service.modalNeeded.subscribe(data => {
      if (data.subject === 'addModal') {
        this.openedModal = data.status
        this.formToggle = !data.status
      }
    })
  }

  async add_func() { 
    this.form.markAllAsTouched();
    if(this.form.valid){
      // Espera la respuesta del backend.
      if(await this.service.create(this.obtainFunc())){
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
      this.preview = '';
    }
  }

    // Extrae los datos de un funcionario valido a un objeto funcionario
    obtainFunc():Funcionario {
      return {
        correo: this.form.value.correo,
        contrasenia: this.form.value.password,
        idSexo: this.form.value.sexo,
        idDepartamento: this.form.value.departamento,
        idTipoFuncionario: this.form.value.tipo,
        fechaNacimiento: this.form.value.nacimiento,
        nombre: this.form.value.nombre,
        apellido1: this.form.value.apellido1,
        apellido2: this.form.value.apellido2,
        urlFoto: this.preview,
      }
    }

    // Metodo para construir el formulario con validaciones
    buildForm(){
      this.form = this.formBuilder.group({
        correo: ["", [
            Validators.required,
            Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"),
            Validators.maxLength(50) ]],
        password: ["", [ Validators.required ]],
        rePassword: ["", [ Validators.required ]],
        departamento: ["", [ Validators.required, Validators.min(1), Validators.max(255)]],
        tipo: ["", [ Validators.required, Validators.min(1), Validators.max(255)]],
        foto: ["", [ Validators.required ]],
        nombre: ["", [ Validators.required, Validators.maxLength(15) ]],
        apellido1: ["", [ Validators.required, Validators.maxLength(15) ]],
        apellido2: ["", [ Validators.required, Validators.maxLength(15) ]],
        sexo: ["", [ Validators.required, Validators.min(1), Validators.max(255) ]],
        nacimiento: ["", [ Validators.required ]],
      })
    }
}