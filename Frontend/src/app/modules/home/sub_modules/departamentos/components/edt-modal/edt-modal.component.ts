import { AlertService } from '@core/services/alert/alert.service';
import { DepartamentosService } from '@core/services/Departamentos/departamentos.service';
import { Departamento } from '@core/models/Departamento';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public departamentId: number;

  constructor(
    private formBuilder: FormBuilder,
    private service: DepartamentosService,
    private alertService: AlertService,
  ) {
    this.modalAction = 'Registrar'
    this.formToggle = false
    this.openedModal = false
    this.departamentId = 0;

    this.form = this.formBuilder.group({
      descripcion: ["",
        [ Validators.required,
          Validators.maxLength(50)
        ]]
    })
  }

  ngOnInit(): void {
    this.service.modalNeeded.subscribe(data => {
      if (data.subject === 'editModal') {
        this.openedModal = data.status
        this.formToggle = !data.status
        this.departamentId = data.departamentId
        this.modalAction = 'Editar'
        this.loadEditDept()
      }
    })
  }

  // Esta funcion tiene que traer del back el usuario a editar.
  loadEditDept() {
    const userData: Departamento = { descripcion: 'Luis@gmail.com' }
    this.form.patchValue({
      descripcion: userData.descripcion
    })
  }

  edt_dept() {
    if(this.form.valid){
      
    }else{
      this.alertService.simpleAlert('Formulario incorrecto')
    }
  }

  // Metodo que destruye formulario y datos cargados al modal
  async closeModal() {
    this.formToggle = true;
    setTimeout(() => { this.openedModal = false }, 500)
    this.form.reset()
  }

}