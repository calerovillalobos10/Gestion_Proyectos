import { Funcionario } from '@core/models/Funcionario';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionariosService } from '@core/services/funcionarios/funcionarios.service';
import { formatDate } from '@angular/common' 

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
    private service: FuncionariosService
  ) {
  
    this.formToggle = false
    this.openedModal = false
 
    this.form = this.formBuilder.group({
      correo: ["",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"),
          Validators.maxLength(50)
        ]],
      password: ["", [
        Validators.required
      ]],
      rePassword: ["", [
        Validators.required
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
      if (data.subject === 'addModal') {
        this.openedModal = data.status
        this.formToggle = !data.status
      }
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