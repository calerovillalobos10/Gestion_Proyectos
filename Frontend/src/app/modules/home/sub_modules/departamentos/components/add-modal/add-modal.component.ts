import { Departamento } from '@core/models/Departamento';
import { ModalSkeleton } from '@core/others/ModalSkeleton';
import { AlertService } from '@core/services/alert/alert.service';
import { DepartamentosService } from '@core/services/departamentos/departamentos.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent extends ModalSkeleton implements OnInit {
  private allRows: Array<Departamento> = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: DepartamentosService,
    private alertService: AlertService
  ) {
    super();

    this.form = this.formBuilder.group({
      descripcion: ["",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ]]
    })
  }

  ngOnInit(): void {
    this.service.modalNeeded.subscribe(data => {
      if (data.subject === 'addModal') {
        this.openedModal = data.status
        this.formToggle = !data.status

        this.service.getAll().subscribe(
          (res) => {
            this.allRows = !res['estado'] ? [] : res['list'];
          },
          (err) => {
            this.allRows = [];
          }
        )
      }
    })
  }

  // Envia los datos de la agregacion del departamento
  add_dept() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    if (this.checkExistance(this.form.value.descripcion)) {
      return this.alertService.simpleAlert('Ya existe este departamento')
    }

    // Espera la respuesta del backend.
    this.service.create({ descripcion: this.form.value.descripcion }).subscribe(
      (res) => {
        if (res['estado']) {
          this.closeModal();
          this.alertService.promiseAlert('Se agregó correctamente el departamento').then(() => {
            this.service.updateNeeded.emit(true)
          })
        } else {
          this.alertService.simpleAlert('Surgió un error inténtelo nuevamente')
        }
      },
      (err) => {
        this.alertService.simpleAlert('Surgió un error inténtelo nuevamente')
      })
  }

  // Valida la existencia del departamento.
  checkExistance(descripcion: string) {
    return this.allRows.some(element => element.descripcion?.toLowerCase() === descripcion.toLowerCase());
  }
}