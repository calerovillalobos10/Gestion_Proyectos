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

  private allRows: Array<Departamento> = [];
  public departamentId: any;

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
        Validators.minLength(2),
        Validators.maxLength(30)]]
    })

    this.service.getAll().subscribe(
      (res) => {
        this.allRows = !res['estado'] ? [] : res['list'];
      },
      (err) => {
        this.allRows = [];
      }
    )
  }

  ngOnInit(): void {
    this.service.modalNeeded.subscribe(data => {
      if (data.subject === 'editModal') {
        this.openedModal = data.status
        this.formToggle = !data.status
        this.departamentId = data.departamentId
        this.loadEditDept();

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

  // Esta funcion tiene que traer del back el usuario a editar.
  loadEditDept() {
   
    this.service.getById(this.departamentId)
    .subscribe(
      (res) => {
     
        if(res['department']){
          this.form.patchValue({ descripcion: res['department']?.descripcion })
        }

      },
      (err) => {
        this.alertService.promiseAlert('No se pudo obtener el departamento')
        .then(()=>this.closeModal())
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

    this.service.update({ descripcion: this.form.value.descripcion, idDepartamento: this.departamentId }).subscribe(
      (res) => {

        if (res['estado']){
          this.closeModal();
          this.alertService.promiseAlert('Se modificó correctamente el departamento').then(() => {
            this.service.updateNeeded.emit(true)
          })
        }else{
          this.alertService.simpleAlert('Surgió un error inténtelo nuevamente')
        }
       },
      (err) => {
         this.alertService.simpleAlert('Surgió un error inténtelo nuevamente')
      })
  }

  // Valida la existencia del departamento.
  checkExistance(descripcion: string, id: number) {
      return this.allRows.some(element => element.descripcion?.toLowerCase() === descripcion.toLowerCase() && element.idDepartamento !== id);
  }
}