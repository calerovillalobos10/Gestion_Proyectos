import { ModalSkeleton } from '@core/others/ModalSkeleton';
import { AlertService } from '@core/services/alert/alert.service';
import { DepartamentosService } from '@core/services/departamentos/departamentos.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Departamento } from '@core/models/Departamento';

@Component({
  selector: 'app-edt-modal',
  templateUrl: './edt-modal.component.html',
  styleUrls: ['./edt-modal.component.scss']
})

export class EdtModalComponent extends ModalSkeleton implements OnInit {

  public departamentId: number;

  constructor(
    private formBuilder: FormBuilder,
    private service: DepartamentosService,
    private alertService: AlertService,
  ) {

    super();
    this.departamentId = 0;
    this.form = this.formBuilder.group({
      descripcion: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)]]
    })
  }

  ngOnInit(): void {
    this.service.modalNeeded.subscribe(data => {
      if (data.subject === 'editModal') {
        this.openedModal = data.status
        this.formToggle = !data.status
        this.departamentId = data.departamentId
        this.loadEditDept();
      }
    })
  }

  // Esta funcion tiene que traer del back el usuario a editar.
  loadEditDept() {
    //const departmentData: Departamento = this.service.getById(this.departamentId); //-------------------------Al tener el back---------------
    const departmentData: Departamento = { descripcion: 'Luis@gmail.com' }
    this.form.patchValue({
      descripcion: departmentData.descripcion
    })
  }

  // Envia los datos de la edicion del departamento
  edt_dept() {

    // Verifica si es invalido
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
    
    // Verifica la existencia del departamento
    if (this.checkExistance(this.form.value.descripcion, this.departamentId)){
      return this.alertService.simpleAlert('Ya existe este departamento')
    }

    // Espera la respuesta del backend.------------------------------------------------------------------------------Al tener el back---------------
    if (this.service.update({ descripcion: this.form.value.descripcion, idDepartamento: this.departamentId })) {
      this.closeModal();
      this.alertService.promiseAlert('Se modificó correctamente el departamento').then(() => {
        this.service.updateNeeded.emit(true)
      })
    } else {
      // Si el backend envia una respuesta incorrecta.
      this.alertService.simpleAlert('Surgió un error inténtelo nuevamente')
    }
  }

  // Valida la existencia del departamento.
  checkExistance(descripcion: string, id: number) {
    return this.service.getAll()
    .some(element => element.descripcion?.toLowerCase() === descripcion.toLowerCase() && element.idDepartamento !== id);
  }

}