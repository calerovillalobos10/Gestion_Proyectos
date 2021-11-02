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
  public modalAction: string;
  private userId: number;

  public preview: string | ArrayBuffer | null | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private service: FuncionariosService
  ) {
    this.modalAction = 'Registrar'
    this.formToggle = false
    this.openedModal = false
    this.userId = 0
    this.form = this.formBuilder.group({
      correo: ["",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"),
          Validators.maxLength(50)
        ]],
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
      ]],
      nombre: ["", [
        Validators.required,
        Validators.maxLength(15),
      ]],
      apellido1: ["", [
        Validators.required,
        Validators.maxLength(15),
      ]],
      apellido2: ["", [
        Validators.required,
        Validators.maxLength(15),
      ]],
      sexo: ["", [
        Validators.required,
        Validators.min(1),
        Validators.max(255)
      ]],
      nacimiento: ["", [
        Validators.required,
      ]],
    })
    this.preview = '';
  }

  ngOnInit(): void {
    this.service.modalNeeded.subscribe(data => {
      if (data.subject === 'editModal') {
        this.openedModal = data.status
        this.formToggle = !data.status
        this.userId = data.userId
        this.modalAction = 'Editar'
        this.loadEditUser()
      }
    })
  }

  // Esta funcion tiene que traer del back el usuario a editar.
  loadEditUser() {

    const userData: Funcionario =
    {
      correo: 'Luis@gmail.com', idTipoFuncionario: '1', idDepartamento: '2', nombre: 'Luis', apellido1: "apellido1",
      apellido2: "apellido2", fechaNacimiento: '1995-09-09', idSexo: '1', urlFoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHuc8zYUjuM2C66ip1xdDpS2qMa2yYnN5TbQ&usqp=CAU'
    }

    let date = new Date();
    let date2 = date.toLocaleDateString().substring(0,10)

    this.form.patchValue({
      correo: userData.correo,
      nombre: userData.nombre,
      apellido1: userData.apellido1,
      apellido2: userData.apellido2,
      departamento: userData.idDepartamento,
      tipo: userData.idTipoFuncionario,
      foto: userData.urlFoto,
      sexo: userData.idSexo,
      nacimiento:userData.fechaNacimiento
    })
    
    setTimeout(()=>{
      this.preview = userData.urlFoto;
     })
  }


  add_func() { }

  // Metodo que destruye formulario y datos cargados al modal
  async closeModal() {
   
    this.formToggle = true;
    setTimeout(() => { this.openedModal = false }, 500)
    this.form.reset()
    this.preview = '';
  }

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

}